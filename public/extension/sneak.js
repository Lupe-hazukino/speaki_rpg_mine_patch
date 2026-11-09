/* Shift edge protection uses the game's own voxel collision and fixed-step physics. */
(() => {
  "use strict";
  const settingKey = "speaki-mining-local:shift-edge-guard:v1";
  const held = new Set();
  let enabled = true, native = null, context = null, listener = null, lastStatus = "";
  try { enabled = localStorage.getItem(settingKey) !== "false"; } catch { /* Session setting. */ }
  const sneakSpeed = .3;
  const status = { supported: false, enabled, held: false, active: false, blockedSteps: 0, eyeDrop: 0, speedMultiplier: 1 };
  const typing = event => event.composedPath().some(element => element instanceof HTMLElement &&
    (element.isContentEditable || element.matches("input,textarea,select")));
  function publish() {
    status.enabled = enabled; status.held = held.size > 0;
    const key = JSON.stringify(status);
    if (key !== lastStatus) { lastStatus = key; listener?.({ ...status }); }
  }
  function available() {
    if (!context?.root.host.isConnected || !context.root.host.getClientRects().length ||
        !context.root.querySelector(".mhud") || context.isMenuOpen()) return false;
    const focus = context.root.activeElement || document.activeElement;
    return !focus || !(focus.isContentEditable || focus.matches?.("input,textarea,select"));
  }
  const active = () => !!native && enabled && held.size > 0 && available();
  function clear() { held.clear(); status.active = false; status.eyeDrop = 0; status.speedMultiplier=1; publish(); }
  window.addEventListener("keydown", event => {
    if (event.code !== "ShiftLeft" && event.code !== "ShiftRight") return;
    if (typing(event) || event.isComposing || event.ctrlKey || event.altKey || event.metaKey) return;
    held.add(event.code); publish();
  }, true);
  window.addEventListener("keyup", event => {
    if (held.delete(event.code)) publish();
  }, true);
  window.addEventListener("blur", clear);
  document.addEventListener("visibilitychange", () => { if (document.hidden) clear(); });
  window.addEventListener("focusin", event => { if (typing(event)) clear(); }, true);

  function supportedAt(world, body, descent = .6) {
    // A downward test against native collision boxes also handles slabs, stairs and fences.
    // Allow a half-block descent, but stop at a one-block cliff. Never manufacture support.
    const probe = { ...body, grounded: false, vy: 0 };
    native.moveY(world.query, world.metaQuery, probe, -descent);
    return probe.grounded && probe.y <= body.y + .0001 && probe.y >= body.y - descent - .0001;
  }
  function guardedInput(world, body, input, dt) {
    const elapsed = Math.min(dt, native.maxStep);
    if (!(elapsed > 0) || !Number.isFinite(elapsed) || input.jump ||
        body.embedded || native.collides(world.query, world.metaQuery, body.x, body.y, body.z) ||
        native.unknown(world.query, body.x, body.y, body.z) || !supportedAt(world, body)) return input;
    // Very short native steps can clear grounded before gravity has moved the
    // feet beyond the collision epsilon. Keep guarding actual contact, without
    // treating a jump or an already airborne descent as grounded.
    if (!body.grounded && (body.vy > 0 || !supportedAt(world, body, .002))) return input;
    let dx = input.moveVx * elapsed, dz = input.moveVz * elapsed;
    if ((!dx && !dz) || !Number.isFinite(dx + dz)) return input;
    const canMove = (x, z) => {
      const probe = { ...body };
      const motion = { ...input, moveVx: x / elapsed, moveVz: z / elapsed, jump: false };
      let left = elapsed;
      while (left > .000001) {
        const step = Math.min(native.fixedStep, left);
        native.advance(world.query, probe, motion, step, world.metaQuery);
        if (probe.embedded || !supportedAt(world, probe)) return false;
        left -= step;
      }
      return true;
    };
    if (canMove(dx, dz)) return input;
    const backOff = distance => Math.abs(distance) <= .05 ? 0 : distance - Math.sign(distance) * .05;
    while (dx && !canMove(dx, 0)) dx = backOff(dx);
    while (dz && !canMove(0, dz)) dz = backOff(dz);
    while (dx && dz && !canMove(dx, dz)) { dx = backOff(dx); dz = backOff(dz); }
    status.blockedSteps++;
    return { ...input, moveVx: dx / elapsed, moveVz: dz / elapsed };
  }
  globalThis.__MINING_LOCAL_BIND_PHYSICS__ = api => {
    if (native) return;
    const worldStep = api.WorldClass?.prototype.stepPhysics, cameraUpdate = api.CameraClass?.prototype.update;
    if (typeof worldStep !== "function" || typeof cameraUpdate !== "function" ||
        ![api.advance, api.moveY, api.collides, api.unknown].every(fn => typeof fn === "function")) return;
    native = api;
    api.WorldClass.prototype.stepPhysics = function(body, input, dt) {
      const engaged = active() && this.group === context.worldGroup;
      status.active = engaged;
      status.speedMultiplier=engaged?sneakSpeed:1;
      const slowed=engaged?{...input,moveVx:input.moveVx*sneakSpeed,moveVz:input.moveVz*sneakSpeed}:input;
      const result = worldStep.call(this, body, engaged ? guardedInput(this, body, slowed, dt) : input, dt);
      publish(); return result;
    };
    api.CameraClass.prototype.update = function() {
      const result = cameraUpdate.apply(this, arguments);
      const drop = active() && this.camera === context.camera && context.getPerspective() === 0 && !this.seated ? .35 : 0;
      this.camera.position.y -= drop;
      status.eyeDrop = drop; publish(); return result;
    };
    status.supported = true; publish();
    delete globalThis.__MINING_LOCAL_BIND_PHYSICS__;
  };
  globalThis.__MINING_LOCAL_SNEAK__ = {
    get enabled() { return enabled; },
    get supported() { return !!native; },
    setEnabled(value) {
      enabled = !!value;
      try { localStorage.setItem(settingKey, String(enabled)); } catch { /* Session setting. */ }
      if (!enabled) { status.active = false; status.eyeDrop = 0; status.speedMultiplier=1; }
      publish();
    },
    setContext(value) { context = value; },
    subscribe(callback) { listener = callback; lastStatus = ""; publish(); }
  };
})();
