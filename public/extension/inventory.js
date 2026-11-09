/* Creative-style layout around the original backpack cards and callbacks. */
globalThis.__MINING_LOCAL_INVENTORY_FACTORY__ = (resources, hotbar) => {
  "use strict";
  const i18n=globalThis.__MINING_LOCAL_I18N__,text=i18n.bind;
  const failure=messageKey=>({ok:false,messageKey,message:i18n.t(messageKey)});
  const panels = new WeakMap(), contents = new WeakMap(), roots = new WeakSet();
  let dragging = null, pendingDrag = null, suppressClickUntil = 0;
  const attribute = (element, name, value) => { if (element.getAttribute(name) !== value) element.setAttribute(name, value); };
  const node = (tag, name) => { const element = document.createElement(tag); element.className = name; return element; };
  function scale(root, panel) {
    const bounds = root.host.getBoundingClientRect();
    const hudScale = parseFloat(getComputedStyle(root.querySelector('.mhud')).getPropertyValue('--ui-scale')) || 1;
    const pixels = Math.max(1, Math.min(3, Math.floor(Math.min((bounds.width - 24) / 195, (bounds.height - 48) / 208)))) / hudScale;
    const value = `${pixels}px`;
    if (panel.style.getPropertyValue('--mc-inv-px') !== value) panel.style.setProperty('--mc-inv-px', value);
  }
  function initialize(panel) {
    const tooltip = node('div', 'mcCreativeTooltip'); tooltip.hidden = true; tooltip.setAttribute('role', 'tooltip');
    const name = node('div', 'mcCreativeTooltipName'), count = node('div', 'mcCreativeTooltipCount');
    const help = node('p','mcInventoryHelp'); text(help,'inventoryHelp');
    const notice = node('p','mcInventoryNotice'); notice.hidden = true; notice.setAttribute('role','status');
    const footer=node('div','mcInventoryFooter');footer.append(help,notice);
    tooltip.append(name, count); panel.append(tooltip,footer);
    const state = { tooltip, name, count, notice, current: null, hotbarSignature: null, noticeTimer: null };
    panels.set(panel, state); panel.classList.add('mcCreativeInventory');
    const show = card => {
      if (!card) { tooltip.hidden = true; state.current = null; return; }
      const label = card.dataset.mcItemName;
      if (!label) return;
      if (name.textContent !== label) name.textContent = label;
      tooltip.hidden = false; state.current = card;
      text(count,'owned',()=>({count:state.current?.dataset.mcFullCount || '0'}));
    };
    const position = (x, y) => {
      const bounds = panel.getBoundingClientRect(), factor = bounds.width / panel.offsetWidth;
      const tip = tooltip.getBoundingClientRect();
      const left = x + tip.width + 16 > innerWidth ? x - tip.width - 12 : x + 12;
      const top = y + tip.height + 16 > innerHeight ? y - tip.height - 12 : y + 12;
      const px = `${(Math.max(4, left) - bounds.left) / factor}px`, py = `${(Math.max(4, top) - bounds.top) / factor}px`;
      if (tooltip.style.left !== px) tooltip.style.left = px;
      if (tooltip.style.top !== py) tooltip.style.top = py;
    };
    panel.addEventListener('pointermove', event => {
      if(dragging){tooltip.hidden=true;return;}
      const card = event.target.closest('.bpCard,.bvCard');
      if (state.current !== card) show(card);
      if (card) position(event.clientX, event.clientY);
    });
    panel.addEventListener('pointerleave', () => show(null));
    panel.addEventListener('focusin', event => {
      const card = event.target.closest('.bpCard,.bvCard'); show(card);
      if (card) { const bounds = card.getBoundingClientRect(); position(bounds.right, bounds.top); }
    });
    panel.addEventListener('focusout', () => show(null));
    return state;
  }
  function notify(root, result) {
    const panel = root.querySelector('.panelBackpack'), state = panel && panels.get(panel);
    if (!state || !result.message) return;
    clearTimeout(state.noticeTimer);
    if(result.messageKey)text(state.notice,result.messageKey,result.messageParams || {});else state.notice.textContent=result.message;
    state.notice.hidden = false;
    state.notice.dataset.error = String(!result.ok);
    state.noticeTimer = setTimeout(() => { state.notice.hidden = true; },3500);
  }
  function cancelDrag() {
    const previous=dragging || pendingDrag; pendingDrag=null;
    if (!previous) return;
    for (const element of previous.root.querySelectorAll('.mcDragging,.mcDropReady,.mcDropTarget')) element.classList.remove('mcDragging','mcDropReady','mcDropTarget');
    const state=panels.get(previous.root.querySelector('.panelBackpack'));if(state){state.tooltip.hidden=true;state.current=null;}
    try { if(previous.source.hasPointerCapture(previous.pointerId))previous.source.releasePointerCapture(previous.pointerId); } catch { /* Source may have been rerendered. */ }
    previous.ghost?.remove(); dragging = null; suppressClickUntil = performance.now()+250;
  }
  function connectDragging(root) {
    root.addEventListener('pointerdown',event => {
      const source = event.composedPath().find(element => element instanceof HTMLElement && element.matches('.bpCard,.bvCard,.mcCreativeHotSlot,.hotSlots>.slot'));
      if (!source || event.button!==0 || event.isPrimary===false) return;
      if(dragging)cancelDrag();
      pendingDrag={root,source,pointerId:event.pointerId,x:event.clientX,y:event.clientY};
    });
    root.addEventListener('click',event => {
      if(performance.now()<suppressClickUntil && event.composedPath().some(element => element instanceof HTMLElement && element.matches('.bpCard,.bvCard,.mcCreativeHotSlot,.hotSlots>.slot'))) {
        event.preventDefault(); event.stopImmediatePropagation();
      }
    },true);
  }
  const dropTarget = (root,x,y) => root.elementFromPoint(x,y)?.closest('.mcCreativeHotSlot,.hotSlots>.slot');
  window.addEventListener('pointermove',event => {
    if(pendingDrag && pendingDrag.pointerId===event.pointerId && Math.hypot(event.clientX-pendingDrag.x,event.clientY-pendingDrag.y)>=6) {
      const {root,source}=pendingDrag,slot=source.matches('.mcCreativeHotSlot,.hotSlots>.slot');
      const data=slot ? hotbar?.slotPayload(root,Number(source.dataset.mcHotbarIndex)) : hotbar?.payload(root,Number(source.dataset.kind),source.matches('.bvCard'));
      if(!data) { cancelDrag(); notify(root,failure(hotbar?.connected(root)?'cannotAssign':'hotbarDisconnected')); return; }
      const ghost=node('span','mcInventoryDragGhost');ghost.setAttribute('aria-hidden','true');ghost.style.backgroundImage=source.querySelector('.ivIcon')?.style.backgroundImage || '';
      root.append(ghost);dragging={...pendingDrag,data,ghost};pendingDrag=null;source.classList.add('mcDragging');
      try {source.setPointerCapture(event.pointerId);}catch{/* Global pointer listeners also handle a replaced source. */}
      for(const target of root.querySelectorAll('.mcCreativeHotSlot'))target.classList.add('mcDropReady');
      const state=panels.get(root.querySelector('.panelBackpack'));if(state)state.tooltip.hidden=true;
    }
    if(!dragging || dragging.pointerId!==event.pointerId)return;
    event.preventDefault();
    const {root,ghost}=dragging,target=dropTarget(root,event.clientX,event.clientY);
    ghost.style.left=`${event.clientX-24}px`;ghost.style.top=`${event.clientY-24}px`;
    for(const old of root.querySelectorAll('.mcDropTarget'))if(old!==target)old.classList.remove('mcDropTarget');
    if(target)target.classList.add('mcDropTarget');
  },{capture:true,passive:false});
  window.addEventListener('pointerup',event => {
    if(!dragging) {pendingDrag=null;return;}
    if(dragging.pointerId!==event.pointerId)return;
    event.preventDefault();
    const {root,data}=dragging,target=dropTarget(root,event.clientX,event.clientY);
    const result=root.host.isConnected && target ? (data.origin==='hotbar'?hotbar.swap(root,data.index,Number(target.dataset.mcHotbarIndex)):hotbar.assign(root,Number(target.dataset.mcHotbarIndex),data))
      : failure('dropOnHotbar');
    cancelDrag();notify(root,result);
  },true);
  window.addEventListener('pointercancel',cancelDrag,true);
  window.addEventListener('blur',cancelDrag);
  window.addEventListener('keydown',event => { if(event.code==='Escape')cancelDrag(); },true);
  document.addEventListener('visibilitychange',() => { if(document.hidden)cancelDrag(); });
  function enhanceCard(card, build = false) {
    const name = card.querySelector(build ? '.bvCardName' : '.bpName');
    const count = card.querySelector(build ? '.bvCardCount' : '.bpCount');
    if (!name || !count) return;
    const label = name.textContent.trim(), full = count.textContent.trim(), amount = full.split('/')[0].trim();
    card.dataset.mcItemName = label; card.dataset.mcFullCount = full;
    count.dataset.mcCount = amount; card.dataset.mcEmpty = String(amount === '0');
    card.draggable = false;
    if (!build) {
      text(card,'cardLabel',{item:label,count:full},'aria-label');
      attribute(card, 'role', card.classList.contains('pick') ? 'button' : 'group');
      card.tabIndex = 0;
    }
  }
  function arrange(content, panel, state) {
    if (!content.isConnected) return;
    let layout = contents.get(content);
    if (!layout) {
      layout = { hotbar: node('div', 'mcCreativeHotbar') };
      attribute(layout.hotbar, 'role', 'group'); text(layout.hotbar,'hotbar',{},'aria-label');
      content.append(layout.hotbar); contents.set(content, layout); state.hotbarSignature = null;
    }
    for (const button of content.querySelectorAll(':scope > .bvTabs > .bvTab')) {
      attribute(button, 'aria-label', button.textContent.trim()); attribute(button, 'title', button.textContent.trim());
      attribute(button, 'aria-pressed', String(button.classList.contains('active')));
    }
    if (!panel.classList.contains('buildMode') && !layout.grid) {
      const grids = [...content.querySelectorAll(':scope > .bpGrid')];
      if (grids.length) {
        const grid = node('div', 'mcCreativeGrid'); text(grid,'inventoryItems',{},'aria-label');
        const cards = grids.flatMap(group => [...group.querySelectorAll(':scope > .bpCard')]);
        grid.append(...cards);
        const rows = Math.max(5, Math.ceil(cards.length / 9));
        for (let i = cards.length; i < rows * 9; i++) { const empty = node('span', 'mcCreativeEmpty'); empty.setAttribute('aria-hidden', 'true'); grid.append(empty); }
        content.append(grid); for (const original of grids) original.remove();
        const scrollbar = node('input', 'mcCreativeScroll'); scrollbar.type = 'range'; scrollbar.min = '0';
        scrollbar.max = String(rows - 5); scrollbar.step = '1'; scrollbar.value = '0'; scrollbar.disabled = rows === 5;
        text(scrollbar,'inventoryScroll',{},'aria-label'); attribute(scrollbar, 'aria-orientation', 'vertical');
        scrollbar.addEventListener('input', () => { grid.scrollTop = Number(scrollbar.value) * grid.clientHeight / 5; });
        grid.addEventListener('scroll', () => { scrollbar.value = String(Math.round(grid.scrollTop / (grid.clientHeight / 5))); });
        content.append(scrollbar); layout.grid = grid;
      }
    }
    for (const card of content.querySelectorAll('.bpCard')) enhanceCard(card);
    for (const card of content.querySelectorAll('.bvCard')) enhanceCard(card, true);
    if (state.current && !state.current.isConnected) { state.current = null; state.tooltip.hidden = true; }
    else if (state.current) {
      if (state.name.textContent !== state.current.dataset.mcItemName) state.name.textContent = state.current.dataset.mcItemName;
      text(state.count,'owned',()=>({count:state.current?.dataset.mcFullCount || '0'}));
    }
    return layout;
  }
  function syncHotbar(root, layout, state) {
    const slots = [...root.querySelectorAll('.hotbar .hotSlots > .slot')].slice(0, 9);
    const signature = i18n.locale + slots.map(slot => [slot.className, slot.title, slot.getAttribute('aria-label'), slot.textContent,
      slot.querySelector('.ivIcon')?.style.backgroundImage].join('|')).join('\n');
    if (signature === state.hotbarSignature) return;
    state.hotbarSignature = signature;
    const children = slots.map((source, index) => {
      const proxy = source.cloneNode(true); proxy.removeAttribute('id'); proxy.classList.remove('slot'); proxy.classList.add('mcCreativeHotSlot');
      proxy.dataset.mcHotbarIndex = String(index); proxy.draggable = false;
      for (const child of proxy.querySelectorAll('[id]')) child.removeAttribute('id');
      const label=source.getAttribute('aria-label') || source.title;
      if(label)attribute(proxy,'aria-label',label);else text(proxy,'hotbarSlot',{slot:index+1},'aria-label');
      proxy.addEventListener('click', event => {
        event.stopPropagation();
        const live=root.querySelectorAll('.hotbar .hotSlots>.slot')[index];
        if(live?.isConnected)live.click();
      });
      return proxy;
    });
    while (children.length < 9) children.push(node('span', 'mcCreativeEmpty'));
    layout.hotbar.replaceChildren(...children);
  }
  function update(root) {
    if (!roots.has(root)) {
      roots.add(root);
      connectDragging(root);
      const resize = new ResizeObserver(() => update(root));
      resize.observe(root.host);
      const hud = root.querySelector('.mhud'); if (hud) resize.observe(hud);
    }
    hotbar?.capture(root);
    for(const [index,slot] of [...root.querySelectorAll('.hotbar .hotSlots>.slot')].entries()) {
      slot.dataset.mcHotbarIndex=String(index); slot.draggable=false;
    }
    for (const panel of root.querySelectorAll('.panelBackpack')) {
      if (getComputedStyle(panel).display === 'none') { const old = panels.get(panel); if (old) old.tooltip.hidden = true; continue; }
      const state = panels.get(panel) || initialize(panel); scale(root, panel);
      panel.dataset.mcDragConnected=String(hotbar?.connected(root) || false);
      const content = panel.querySelector(':scope > .bpContent');
      if (!content) continue;
      const layout = arrange(content, panel, state); if (layout) syncHotbar(root, layout, state);
    }
    i18n.update(root);
  }
  function handleKey(event) {
    const card = event.composedPath().find(element => element instanceof HTMLElement && element.matches('.mcCreativeGrid > .bpCard,.mcCreativeHotbar > .mcCreativeHotSlot'));
    if (!card || event.altKey || event.ctrlKey || event.metaKey || event.isComposing) return false;
    const arrows = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -9, ArrowDown: 9 };
    if (/^Digit[1-9]$/.test(event.code) && card.matches('.bpCard')) {
      event.preventDefault(); event.stopImmediatePropagation();
      const root=card.getRootNode(), data=hotbar?.payload(root,Number(card.dataset.kind));
      notify(root,data ? hotbar.assign(root,Number(event.code.slice(-1))-1,data) : failure('cannotAssign'));
      return true;
    }
    if (event.code in arrows) {
      event.preventDefault(); event.stopImmediatePropagation();
      const mirror = card.classList.contains('mcCreativeHotSlot');
      const cards = [...card.parentElement.querySelectorAll(mirror ? '.mcCreativeHotSlot' : '.bpCard')];
      const distance = mirror ? Math.sign(arrows[event.code]) : arrows[event.code];
      const index = Math.max(0, Math.min(cards.length - 1, cards.indexOf(card) + distance));
      cards[index].focus({preventScroll:true}); return true;
    }
    if ((event.code === 'Enter' || event.code === 'Space') && (card.classList.contains('pick') || card.classList.contains('mcCreativeHotSlot'))) {
      event.preventDefault(); event.stopImmediatePropagation(); if (!event.repeat) card.click(); return true;
    }
    return false;
  }
  return { update, handleKey };
};
