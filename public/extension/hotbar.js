/* Bind layout edits to the original client's local brush settings. */
(() => {
  "use strict";
  const i18n=globalThis.__MINING_LOCAL_I18N__,t=i18n.t;
  const huds = new WeakMap();
  let native = null, minecartIcon = null;
  globalThis.__MINING_LOCAL_BIND_HOTBAR__ = api => {
    if (native || !api.HUDClass?.prototype.rebuildHotbar || !api.normalizeBrush || !api.saveBrushes) return;
    native = api;
    if (minecartIcon) api.itemIcons?.set(14,minecartIcon);
    const rebuild = api.HUDClass.prototype.rebuildHotbar;
    api.HUDClass.prototype.rebuildHotbar = function() {
      const result = rebuild.apply(this, arguments);
      huds.set(this.root, this);
      this.root.dataset.miningVanillaHotbarConnected = 'true';
      this.slots.forEach((slot, index) => { slot.root.dataset.mcHotbarIndex = String(index); });
      return result;
    };
    const setTargetHint = api.HUDClass.prototype.setTargetHint;
    if (setTargetHint && api.farHint) {
      api.HUDClass.prototype.setTargetHint = function(text) {
        return setTargetHint.call(this, text === api.farHint() ? null : text);
      };
    }
    if (api.BuildClass) {
      const materialCard = api.BuildClass.prototype.materialCard;
      api.BuildClass.prototype.materialCard = function(kind) {
        const card = materialCard.apply(this, arguments); card.dataset.kind = String(kind); return card;
      };
    }
    delete globalThis.__MINING_LOCAL_BIND_HOTBAR__;
  };
  globalThis.__MINING_LOCAL_HOTBAR_FACTORY__ = resources => {
    minecartIcon = resources.minecartItem;
    if (native && minecartIcon) native.itemIcons?.set(14,minecartIcon);
    let context = null, accumulator = 0, lastWheel = 0;
    const labels = new WeakMap();
    const hud = root => huds.get(root?.querySelector('.mhud'));
    function selectionName(current) {
      if (current.pickaxeMode) return '';
      const brush = current.activeBrush;
      if (!brush || !native.itemName) return '';
      const name = native.itemName(brush.kind);
      const details = [];
      if (brush.shape) details.push(native.shapeName(brush.shape));
      if (Number.isInteger(brush.color) && brush.color > 0 && brush.color < 16 &&
          native.canColor?.(brush.kind,brush.shape || 0) && native.colorName)
        details.push(native.colorName(brush.color));
      return details.length ? t('itemWithShape',{item:name,shape:details.join(t('itemDetailsSeparator'))}) : name;
    }
    function positionSelectionName(current,state,bar) {
      const bounds = bar.getBoundingClientRect();
      if (!bounds.width || !bar.offsetWidth) return;
      const scale = bounds.width / bar.offsetWidth;
      const labelBounds = state.label.getBoundingClientRect();
      let top = bounds.top;
      for (const obstacle of current.root.querySelectorAll('.pickaxeTag,.oreChip,.targetHint,.toast,.actionPrompt')) {
        const rect = obstacle.getBoundingClientRect();
        if (rect.width && rect.height && rect.left < labelBounds.right && rect.right > labelBounds.left &&
            getComputedStyle(obstacle).visibility !== 'hidden') top = Math.min(top,rect.top);
      }
      const bottom = `${Math.ceil((bounds.bottom - top) / scale + 8)}px`;
      if (state.label.style.bottom !== bottom) state.label.style.bottom = bottom;
    }
    function syncSelectionName(current) {
      const bar = current.hotbarRoot || current.root.querySelector('.hotbar');
      if (!bar) return;
      const brush = current.activeBrush;
      const key = [i18n.locale,current.pickaxeMode ? 'pickaxe' : [current.placeIndex,brush?.kind,brush?.shape,brush?.color,brush?.axis].join(':')].join(':');
      let state = labels.get(current);
      if (!state) {
        const label = document.createElement('div'); label.className = 'mcSelectedItemName'; label.hidden = true;
        label.setAttribute('role','status'); label.setAttribute('aria-live','polite'); label.setAttribute('aria-atomic','true');
        state = {key,label,pending:false,fadeTimer:null,hideTimer:null}; labels.set(current,state); bar.append(label);
        return;
      }
      if (state.key !== key) { state.key = key; state.pending = true; }
      if (current.anyPanelOpen || context?.isMenuOpen()) {
        if (!state.label.hidden) {
          clearTimeout(state.fadeTimer); clearTimeout(state.hideTimer); state.label.hidden = true;
        }
        return;
      }
      if (state.pending) {
        state.pending = false;
        clearTimeout(state.fadeTimer); clearTimeout(state.hideTimer);
        const text = selectionName(current);
        state.label.textContent = text; state.label.hidden = !text; state.label.classList.remove('mcFading');
        if (text) state.fadeTimer = setTimeout(() => {
          state.label.classList.add('mcFading');
          state.hideTimer = setTimeout(() => { state.label.hidden = true; },250);
        },1750);
      }
      if (!state.label.hidden) positionSelectionName(current,state,bar);
    }
    function capture(root) {
      const current = hud(root);
      if (current && native.itemIcons && resources.minecartItem) native.itemIcons.set(14, resources.minecartItem);
      if (current) syncSelectionName(current);
      return current;
    }
    const result = (ok,messageKey,messageParams={}) => ({ok,messageKey,messageParams,message:t(messageKey,messageParams)});
    const failure = key => result(false,key);
    function payload(root, kind, build = false) {
      const current = capture(root);
      if (!current) return null;
      const brush = build ? native.normalizeBrush({...current.backpackPanel.buildView.brush,kind}) : current.defaultBrushOf(kind);
      return brush && current.brushEnabled(brush) ? { origin: 'inventory', brush: {...brush} } : null;
    }
    function assign(root, index, data) {
      const current = capture(root), brush = native?.normalizeBrush(data?.brush || {});
      if (!current) return failure('hotbarDisconnected');
      if (!Number.isInteger(index) || index < 0 || index >= 9 || !brush) return failure('cannotAssign');
      if (!current.brushEnabled(brush)) return failure('permissionDenied');
      current.assignBrush(index, brush, performance.now());
      return result(true,'assigned',{slot:index+1});
    }
    function swap(root, from, to) {
      const current = capture(root);
      if (!current) return failure('hotbarDisconnected');
      if (![from,to].every(index => Number.isInteger(index) && index >= 0 && index < 9)) return failure('chooseSlot');
      if (from === to) return {ok:true,message:''};
      const brushes = current.brushes.map(brush => ({...brush}));
      [brushes[from],brushes[to]] = [brushes[to],brushes[from]];
      if (!brushes.every(brush => native.normalizeBrush(brush))) return failure('unsupportedItems');
      current.brushes = brushes; native.saveBrushes(brushes);
      if (!current.pickaxeMode && current.placeIndex >= 0) {
        if (current.brushEnabled(brushes[current.placeIndex])) {
          current.activeBrush = brushes[current.placeIndex];
          current.backpackPanel.buildView.setBrush(current.activeBrush);
        } else { current.pickaxeMode = true; current.placeIndex = -1; }
      }
      current.rebuildHotbar(); current.callbacks.placeSelectionChanged();
      return result(true,'swapped',{from:from+1,to:to+1});
    }
    function select(root, index) {
      const current = capture(root);
      if (!current || !Number.isInteger(index) || index < 0 || index >= 9 || !current.brushEnabled(current.brushes[index])) return false;
      current.selectPlace(index); current.callbacks.placeSelectionChanged(); return true;
    }
    function cycle(root, direction) {
      const current = capture(root); if (!current) return false;
      let index = current.pickaxeMode || current.placeIndex < 0 ? (direction > 0 ? -1 : 0) : current.placeIndex;
      for (let i = 0; i < 9; i++) { index = (index + direction + 9) % 9; if (select(root,index)) return true; }
      return false;
    }
    function wheel(event) {
      const root = context?.root, current = capture(root);
      if (!root?.host.isConnected || !root.host.getClientRects().length || !current || context.isMenuOpen() || current.anyPanelOpen ||
          event.ctrlKey || event.altKey || event.metaKey || !event.deltaY) return;
      const focus=root.activeElement || document.activeElement;
      if(focus && (focus.isContentEditable || focus.matches?.('input,textarea,select')))return;
      const path = event.composedPath();
      if (!path.some(element => element === root.host) || path.some(element => element instanceof HTMLElement &&
          (element.isContentEditable || element.matches('input,textarea,select')))) return;
      const now = performance.now(), pixels = event.deltaY * (event.deltaMode === 1 ? 40 : event.deltaMode === 2 ? 120 : 1);
      if (now - lastWheel > 250 || Math.sign(accumulator) !== Math.sign(pixels)) accumulator = 0;
      lastWheel = now;
      let steps;
      if (Math.abs(pixels) >= 40) { steps = Math.sign(pixels) * Math.max(1,Math.round(Math.abs(pixels) / 100)); accumulator = 0; }
      else { accumulator += pixels; steps = Math.trunc(accumulator / 40); accumulator -= steps * 40; }
      event.preventDefault(); event.stopImmediatePropagation();
      const available=current.brushes.filter(brush=>current.brushEnabled(brush)).length;
      if(!steps || !available)return;
      const count=current.pickaxeMode || current.placeIndex<0 ? (Math.abs(steps)-1)%available+1 : Math.abs(steps)%available;
      for (let i = 0; i < count; i++) cycle(root,Math.sign(steps));
    }
    window.addEventListener('wheel',wheel,{capture:true,passive:false});
    window.addEventListener('blur',() => { accumulator = 0; });
    return {
      capture, payload, assign, swap, select, cycle,
      setContext(value) { context = value; capture(value.root); },
      connected(root) { return !!capture(root); },
      slotPayload(root,index) {
        const current = capture(root), brush = current?.brushes[index];
        return brush ? {origin:'hotbar',index,brush:{...brush}} : null;
      }
    };
  };
})();
