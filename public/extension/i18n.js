/* MOD text only. Item, shape and color names come from the game's own translator. */
(() => {
  'use strict';
  const messages = {
    ja: {
      paperDollLabel: 'ペーパードールを表示する', paperDollHint: '一人称のとき、左上に自分のキャラクターを表示します。', paperDollPortrait: '自分のキャラクター',
      modName: 'Speaki_rpg_mine_patch（スピキクラフトMOD）', ready: '準備完了',
      realismLabel: '写実的な光', realismHint: '柔らかい光を追加して、リアルな描写にします。「影を表示する」よりも負荷が高くなります。',
      shadowsLabel: "影を表示する",
      shadowsHint: "簡易的な影を表示します。",
      shadowsUnavailable: "影の描画を停止しました。再読み込みすると元の表示で起動します。",
      sunPosition: '時間帯', sunMorning: '朝', sunDay: '昼', sunEvening: '夕方',
      shadowRange: '影の範囲', rangeSmall: '小（32ブロック）', rangeMedium: '中（64ブロック）', rangeHigh: '高（128ブロック）', rangeUltra: '極高（表示中すべて）',
      sunHint: '朝・夕方は影が長くなり、夕方は画面に赤みが加わります。',

      settingsButton: 'MOD設定 [F2]', settingsTitle: 'スピキクラフトMOD 設定',
      viewHint: '視点：{view}　[M]で切り替え',
      perspective0: '一人称', perspective1: '三人称（後方）', perspective2: '二人称（正面）',
      sneakLabel: 'Shift中の落下防止',
      sneakHint: 'Shift中は移動速度が30％になり、一人称の視点だけ少し下がります。',
      sneakUnavailable: '落下防止は未接続です。拡張機能とゲームを再読み込みしてください。ゲーム更新後はMODの更新が必要です。',
      sneakWarning: 'Shift落下防止が未接続です。拡張機能とゲームを再読み込みしてください。',
      controlsLabel: '某ゲーム風の操作',
      controlsHint: 'F1：HUD切替／T：チャット／E：インベントリ／Ctrl単独：エモート。Esc：チャットを閉じる／Shift：降車／右クリック長押し：連続配置。',
      done: '完了', closeKeys: 'F2 / Esc で閉じる',
      inventoryHelp: 'アイテムを下の枠へドラッグして登録。枠どうしのドラッグで入れ替え。',
      owned: '所持数：{count}', cardLabel: '{item}、所持数 {count}',
      hotbar: 'ホットバー', hotbarSlot: 'ホットバー {slot}', inventoryItems: 'リュックのアイテム', inventoryScroll: 'リュックのスクロール',
      cannotAssign: 'このアイテムは鉱山のホットバーに登録できません。',
      hotbarDisconnected: 'ホットバーが未接続です。拡張機能とゲームを再読み込みしてください。',
      permissionDenied: 'この鉱山で使用する権限がないアイテムです。',
      assigned: 'ホットバー {slot} に登録しました。', chooseSlot: '登録先の枠を選んでください。',
      unsupportedItems: '対応していないアイテムが含まれています。', swapped: 'ホットバー {from} と {to} を入れ替えました。',
      dropOnHotbar: 'ホットバーの枠にドロップしてください。', itemWithShape: '{item}（{shape}）', itemDetailsSeparator: '・', buildOpen: '建築アイテム',
      renderModuleChanged: 'ゲーム更新により描画モジュールの構成が変わっています。MODを更新してください。',
      cameraModuleMissing: '視点変更モジュールを読み込めません。拡張機能を更新してください。',
      nativeAvatarMissing: '鉱山のキャラクター描画を読み込めません。', canvasMissing: 'アイテム表示用Canvasを作成できません。',
      clientStructureChanged: '確認済みクライアントの構造が一致しません。', clientFetchFailed: 'ゲームクライアントを取得できません：{status}',
      clientUpdated: 'ゲームが更新されたためMODを接続せず、元ゲームを起動します。',
      clientBootFailed: 'MODの接続に失敗しました。拡張機能を無効にしてゲームを再読み込みできます。'
    },
    ko: {
      paperDollLabel: '페이퍼 돌 표시', paperDollHint: '1인칭 시점에서 화면 왼쪽 위에 내 캐릭터를 표시합니다.', paperDollPortrait: '내 캐릭터',
      modName: 'Speaki_rpg_mine_patch', ready: '준비 완료',
      realismLabel: '사실적인 조명', realismHint: '부드러운 빛을 추가해 사실적인 화면을 만듭니다. ‘그림자 표시’보다 시스템 부하가 높습니다.',
      shadowsLabel: "그림자 표시",
      shadowsHint: "간단한 그림자를 표시합니다.",
      shadowsUnavailable: "그림자 렌더링을 중지했습니다. 새로고침하면 원래 화면으로 시작합니다.",
      sunPosition: '시간대', sunMorning: '아침', sunDay: '낮', sunEvening: '저녁',
      shadowRange: '그림자 범위', rangeSmall: '낮음 (32블록)', rangeMedium: '중간 (64블록)', rangeHigh: '높음 (128블록)', rangeUltra: '매우 높음 (표시 중인 지형 전체)',
      sunHint: '아침과 저녁에는 그림자가 길어지고, 저녁에는 화면에 붉은 기운이 더해집니다.',

      settingsButton: 'MOD 설정 [F2]', settingsTitle: 'MOD 설정',
      viewHint: '시점: {view} · [M]으로 전환',
      perspective0: '1인칭', perspective1: '3인칭 (후방)', perspective2: '2인칭 (정면)',
      sneakLabel: 'Shift를 누르는 동안 추락 방지',
      sneakHint: 'Shift를 누르면 이동 속도가 평소의 30%가 되고 1인칭 시점만 조금 낮아집니다.',
      sneakUnavailable: '추락 방지 기능이 연결되지 않았습니다. 확장 프로그램과 게임을 새로고침하세요. 게임이 업데이트되면 MOD도 업데이트해야 합니다.',
      sneakWarning: 'Shift 추락 방지 기능이 연결되지 않았습니다. 확장 프로그램과 게임을 새로고침하세요.',
      controlsLabel: '다른 게임 스타일 조작',
      controlsHint: 'F1: HUD 표시 전환 / T: 채팅 / E: 인벤토리 / Ctrl만 눌렀다 떼기: 이모트. Esc: 채팅 닫기 / Shift: 하차 / 오른쪽 버튼 길게 누르기: 연속 배치.',
      done: '완료', closeKeys: 'F2 / Esc로 닫기',
      inventoryHelp: '아이템을 아래 슬롯으로 드래그해 등록하세요. 슬롯끼리 드래그하면 서로 바뀝니다.',
      owned: '보유 수량: {count}', cardLabel: '{item}, 보유 수량 {count}',
      hotbar: '핫바', hotbarSlot: '핫바 {slot}', inventoryItems: '배낭 아이템', inventoryScroll: '배낭 스크롤',
      cannotAssign: '이 아이템은 광산 핫바에 등록할 수 없습니다.',
      hotbarDisconnected: '핫바가 연결되지 않았습니다. 확장 프로그램과 게임을 새로고침하세요.',
      permissionDenied: '이 광산에서 사용할 권한이 없는 아이템입니다.',
      assigned: '핫바 {slot}번에 등록했습니다.', chooseSlot: '등록할 슬롯을 선택하세요.',
      unsupportedItems: '지원하지 않는 아이템이 포함되어 있습니다.', swapped: '핫바 {from}번과 {to}번을 서로 바꿨습니다.',
      dropOnHotbar: '핫바 슬롯에 놓으세요.', itemWithShape: '{item} ({shape})', itemDetailsSeparator: ' · ', buildOpen: '건축 아이템',
      renderModuleChanged: '게임 업데이트로 렌더링 모듈 구조가 변경되었습니다. MOD를 업데이트하세요.',
      cameraModuleMissing: '시점 전환 모듈을 불러올 수 없습니다. 확장 프로그램을 업데이트하세요.',
      nativeAvatarMissing: '광산 캐릭터 렌더러를 불러올 수 없습니다.', canvasMissing: '아이템 표시용 Canvas를 만들 수 없습니다.',
      clientStructureChanged: '확인된 게임 클라이언트 구조와 일치하지 않습니다.', clientFetchFailed: '게임 클라이언트를 가져올 수 없습니다: {status}',
      clientUpdated: '게임이 업데이트되어 MOD를 연결하지 않고 원래 게임을 실행합니다.',
      clientBootFailed: 'MOD 연결에 실패했습니다. 확장 프로그램을 끄고 게임을 새로고침할 수 있습니다.'
    },
    en: {
      paperDollLabel: 'Show paper doll', paperDollHint: 'Display your character in the upper-left corner in first-person view.', paperDollPortrait: 'Your character',
      modName: 'Speaki_rpg_mine_patch', ready: 'Ready',
      realismLabel: 'Realistic lighting', realismHint: 'Adds soft light for more realistic visuals. Uses more processing power than “Show shadows”.',
      shadowsLabel: "Show shadows",
      shadowsHint: "Displays simple shadows.",
      shadowsUnavailable: "Shadow rendering has stopped. Reload to start with the original appearance.",
      sunPosition: 'Time of day', sunMorning: 'Morning', sunDay: 'Noon', sunEvening: 'Evening',
      shadowRange: 'Shadow range', rangeSmall: 'Low (32 blocks)', rangeMedium: 'Medium (64 blocks)', rangeHigh: 'High (128 blocks)', rangeUltra: 'Ultra (all visible terrain)',
      sunHint: 'Morning and evening cast longer shadows; evening adds a reddish tint.',

      settingsButton: 'MOD settings [F2]', settingsTitle: 'MOD settings',
      viewHint: 'View: {view} · Press [M] to switch',
      perspective0: 'First person', perspective1: 'Third person (rear)', perspective2: 'Second person (front)',
      sneakLabel: 'Prevent falling off edges while holding Shift',
      sneakHint: 'Holding Shift reduces movement speed to 30% of normal and slightly lowers the first-person camera.',
      sneakUnavailable: 'Edge protection is not connected. Reload the extension and game. The MOD needs an update after game updates.',
      sneakWarning: 'Shift edge protection is not connected. Reload the extension and game.',
      controlsLabel: 'Controls inspired by another game',
      controlsHint: 'F1: toggle HUD / T: chat / E: inventory / press and release Ctrl alone: emotes. Esc: close chat / Shift: dismount / hold right-click: place blocks repeatedly.',
      done: 'Done', closeKeys: 'F2 / Esc to close',
      inventoryHelp: 'Drag items to the slots below to assign them. Drag between slots to swap.',
      owned: 'Owned: {count}', cardLabel: '{item}, owned {count}',
      hotbar: 'Hotbar', hotbarSlot: 'Hotbar slot {slot}', inventoryItems: 'Backpack items', inventoryScroll: 'Scroll backpack',
      cannotAssign: 'This item cannot be assigned to the Mining hotbar.',
      hotbarDisconnected: 'The hotbar is not connected. Reload the extension and game.',
      permissionDenied: 'You do not have permission to use this item in this mine.',
      assigned: 'Assigned to hotbar slot {slot}.', chooseSlot: 'Choose a destination slot.',
      unsupportedItems: 'The selection contains unsupported items.', swapped: 'Swapped hotbar slots {from} and {to}.',
      dropOnHotbar: 'Drop the item onto a hotbar slot.', itemWithShape: '{item} ({shape})', itemDetailsSeparator: ', ', buildOpen: 'Building items',
      renderModuleChanged: 'A game update changed the rendering module. Update the MOD.',
      cameraModuleMissing: 'The camera mode module could not be loaded. Update the extension.',
      nativeAvatarMissing: 'The Mining character renderer could not be loaded.', canvasMissing: 'The item display Canvas could not be created.',
      clientStructureChanged: 'The game client does not match the reviewed structure.', clientFetchFailed: 'Could not fetch the game client: {status}',
      clientUpdated: 'The game has updated. Starting the original game without connecting the MOD.',
      clientBootFailed: 'The MOD could not connect. You can disable the extension and reload the game.'
    },
    'zh-CN': {
      paperDollLabel: '显示纸娃娃', paperDollHint: '在第一人称视角下，于左上角显示自己的角色。', paperDollPortrait: '自己的角色',
      modName: 'Speaki_rpg_mine_patch', ready: '准备就绪',
      realismLabel: '写实光照', realismHint: '添加柔和的光线，使画面更加真实。比“显示阴影”消耗更多性能。',
      shadowsLabel: "显示阴影",
      shadowsHint: "显示简单的阴影。",
      shadowsUnavailable: "已停止阴影渲染。重新加载后将使用原有画面。",
      sunPosition: '时段', sunMorning: '早晨', sunDay: '中午', sunEvening: '傍晚',
      shadowRange: '阴影范围', rangeSmall: '低（32格）', rangeMedium: '中（64格）', rangeHigh: '高（128格）', rangeUltra: '极高（全部可见地形）',
      sunHint: '早晨和傍晚的影子更长，傍晚的画面会偏红。',

      settingsButton: 'MOD设置 [F2]', settingsTitle: 'MOD设置',
      viewHint: '视角：{view} · 按 [M] 切换',
      perspective0: '第一人称', perspective1: '第三人称（背面）', perspective2: '第二人称（正面）',
      sneakLabel: '按住Shift时防止从边缘掉落',
      sneakHint: '按住Shift时，移动速度降至平时的30%，仅第一人称视角会略微降低。',
      sneakUnavailable: '防跌落功能尚未连接。请重新加载扩展程序和游戏。游戏更新后，MOD也需要更新。',
      sneakWarning: 'Shift防跌落功能尚未连接。请重新加载扩展程序和游戏。',
      controlsLabel: '参考另一款游戏的操作',
      controlsHint: 'F1：切换HUD显示／T：聊天／E：物品栏／单独按下并松开Ctrl：表情动作。Esc：关闭聊天／Shift：下车／按住右键：连续放置方块。',
      done: '完成', closeKeys: '按F2 / Esc关闭',
      inventoryHelp: '将物品拖到下方快捷栏中进行设置。在格子之间拖动可交换物品。',
      owned: '持有数量：{count}', cardLabel: '{item}，持有数量 {count}',
      hotbar: '快捷栏', hotbarSlot: '快捷栏第{slot}格', inventoryItems: '背包物品', inventoryScroll: '滚动背包',
      cannotAssign: '无法将此物品设置到矿山快捷栏。',
      hotbarDisconnected: '快捷栏尚未连接。请重新加载扩展程序和游戏。',
      permissionDenied: '你没有在此矿山使用该物品的权限。',
      assigned: '已设置到快捷栏第{slot}格。', chooseSlot: '请选择目标格子。',
      unsupportedItems: '所选物品中包含不支持的物品。', swapped: '已交换快捷栏第{from}格与第{to}格。',
      dropOnHotbar: '请将物品放到快捷栏的格子中。', itemWithShape: '{item}（{shape}）', itemDetailsSeparator: '、', buildOpen: '建筑物品',
      renderModuleChanged: '游戏更新导致渲染模块结构发生变化。请更新MOD。',
      cameraModuleMissing: '无法加载视角切换模块。请更新扩展程序。',
      nativeAvatarMissing: '无法加载矿山角色渲染器。', canvasMissing: '无法创建用于显示物品的Canvas。',
      clientStructureChanged: '游戏客户端与已检查的结构不一致。', clientFetchFailed: '无法获取游戏客户端：{status}',
      clientUpdated: '游戏已更新。将不连接MOD，直接启动原游戏。',
      clientBootFailed: 'MOD连接失败。你可以停用扩展程序后重新加载游戏。'
    },
    'zh-TW': {
      paperDollLabel: '顯示紙娃娃', paperDollHint: '在第一人稱視角下，於左上角顯示自己的角色。', paperDollPortrait: '自己的角色',
      modName: 'Speaki_rpg_mine_patch', ready: '準備就緒',
      realismLabel: '寫實光照', realismHint: '加入柔和的光線，讓畫面更加真實。比「顯示陰影」消耗更多效能。',
      shadowsLabel: "顯示陰影",
      shadowsHint: "顯示簡易陰影。",
      shadowsUnavailable: "已停止陰影繪製。重新載入後將使用原有畫面。",
      sunPosition: '時段', sunMorning: '早晨', sunDay: '中午', sunEvening: '傍晚',
      shadowRange: '陰影範圍', rangeSmall: '低（32格）', rangeMedium: '中（64格）', rangeHigh: '高（128格）', rangeUltra: '極高（全部可見地形）',
      sunHint: '早晨和傍晚的影子更長，傍晚的畫面會偏紅。',

      settingsButton: 'MOD設定 [F2]', settingsTitle: 'MOD設定',
      viewHint: '視角：{view} · 按 [M] 切換',
      perspective0: '第一人稱', perspective1: '第三人稱（背面）', perspective2: '第二人稱（正面）',
      sneakLabel: '按住Shift時防止從邊緣掉落',
      sneakHint: '按住Shift時，移動速度降至平時的30%，只有第一人稱視角會稍微降低。',
      sneakUnavailable: '防墜落功能尚未連接。請重新載入擴充功能與遊戲。遊戲更新後，MOD也需要更新。',
      sneakWarning: 'Shift防墜落功能尚未連接。請重新載入擴充功能與遊戲。',
      controlsLabel: '參考另一款遊戲的操作',
      controlsHint: 'F1：切換HUD顯示／T：聊天／E：物品欄／單獨按下並放開Ctrl：表情動作。Esc：關閉聊天／Shift：下車／按住右鍵：連續放置方塊。',
      done: '完成', closeKeys: '按F2 / Esc關閉',
      inventoryHelp: '將物品拖到下方快捷列中進行設定。在格子之間拖曳可交換物品。',
      owned: '持有數量：{count}', cardLabel: '{item}，持有數量 {count}',
      hotbar: '快捷列', hotbarSlot: '快捷列第{slot}格', inventoryItems: '背包物品', inventoryScroll: '捲動背包',
      cannotAssign: '無法將此物品設定到礦山快捷列。',
      hotbarDisconnected: '快捷列尚未連接。請重新載入擴充功能與遊戲。',
      permissionDenied: '你沒有在此礦山使用該物品的權限。',
      assigned: '已設定到快捷列第{slot}格。', chooseSlot: '請選擇目標格子。',
      unsupportedItems: '所選物品中包含不支援的物品。', swapped: '已交換快捷列第{from}格與第{to}格。',
      dropOnHotbar: '請將物品放到快捷列的格子中。', itemWithShape: '{item}（{shape}）', itemDetailsSeparator: '、', buildOpen: '建築物品',
      renderModuleChanged: '遊戲更新導致算繪模組結構改變。請更新MOD。',
      cameraModuleMissing: '無法載入視角切換模組。請更新擴充功能。',
      nativeAvatarMissing: '無法載入礦山角色算繪器。', canvasMissing: '無法建立用於顯示物品的Canvas。',
      clientStructureChanged: '遊戲用戶端與已檢查的結構不一致。', clientFetchFailed: '無法取得遊戲用戶端：{status}',
      clientUpdated: '遊戲已更新。將不連接MOD，直接啟動原遊戲。',
      clientBootFailed: 'MOD連接失敗。你可以停用擴充功能後重新載入遊戲。'
    }
  };
  const supported = Object.freeze(Object.keys(messages)), listeners = new Set(), bindings = new WeakMap();
  let native = null, locale;
  function normalize(value) {
    const tag = String(value || '').replaceAll('_', '-').toLowerCase();
    if (/^zh(?:-(?:tw|hk|mo|hant)(?:-|$))/.test(tag)) return 'zh-TW';
    if (/^zh(?:-|$)/.test(tag)) return 'zh-CN';
    return ['ja','ko','en'].find(code => tag === code || tag.startsWith(code + '-')) || null;
  }
  function detect() {
    try { const value = normalize(native?.getLocale()); if (value) return value; } catch { /* Use the persisted game setting. */ }
    try { const value = normalize(JSON.parse(localStorage.getItem('sr1_settings') || '{}')?.locale); if (value) return value; } catch { /* Storage can be disabled. */ }
    return normalize(document.documentElement?.lang) || normalize(navigator.language) || 'en';
  }
  function t(key, params = {}) {
    const value = messages[locale]?.[key] ?? messages.en[key] ?? key;
    return value.replace(/\{(\w+)\}/g, (placeholder, name) => params[name] === undefined ? placeholder : String(params[name]));
  }
  function nativeText(key, fallback) {
    try { const value = native?.translate(key); if (typeof value === 'string' && value && value !== key) return value; } catch { /* MOD fallback is still localized. */ }
    return t(fallback);
  }
  function render(element, attribute, rule) {
    const value = rule.nativeKey ? nativeText(rule.nativeKey, rule.key) : t(rule.key, typeof rule.params === 'function' ? rule.params() : rule.params);
    if (attribute === 'textContent') { if (element.textContent !== value) element.textContent = value; }
    else if (element.getAttribute(attribute) !== value) element.setAttribute(attribute, value);
  }
  function bind(element, key, params = {}, attribute = 'textContent', nativeKey = null) {
    let rules = bindings.get(element);
    if (!rules) { bindings.set(element, rules = new Map()); element.setAttribute('data-mining-i18n', ''); }
    const rule = {key, params, nativeKey}; rules.set(attribute, rule); render(element, attribute, rule); return element;
  }
  function update(root) {
    const nodes = [...root.querySelectorAll('[data-mining-i18n]')];
    if (root.matches?.('[data-mining-i18n]')) nodes.unshift(root);
    for (const element of nodes) for (const [attribute, rule] of bindings.get(element) || []) render(element, attribute, rule);
  }
  function refresh() {
    const next = detect(); if (next === locale) return;
    locale = next; for (const listener of listeners) listener(locale);
  }
  locale = detect();
  globalThis.__MINING_LOCAL_I18N__ = Object.freeze({t, bind, update, refresh, nativeText, supported, get locale() { return locale; }, subscribe(listener) { listeners.add(listener); return () => listeners.delete(listener); }});
  globalThis.__MINING_LOCAL_BIND_I18N__ = api => { native = api; refresh(); };
  new MutationObserver(refresh).observe(document.documentElement || document, {attributes: true, attributeFilter: ['lang'], childList: !document.documentElement});
  window.addEventListener('storage', event => { if (!event.key || event.key === 'sr1_settings') refresh(); });
})();
