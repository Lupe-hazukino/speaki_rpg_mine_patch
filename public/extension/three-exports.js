(() => {
  // The November 28 game update changed Three.js's generated export names.
  const november28 = {
    $:'Q', $t:'Qt', B:'z', Ct:'St', D:'E', F:'P', Gt:'Wt', Ir:'Ir', It:'Ft',
    L:'I', Lr:'Lr', Lt:'It', Rr:'Rr', Rt:'Lt', V:'B', Vr:'Vr', X:'Y', Xn:'Yn',
    Yn:'Jn', _:'g', a:'a', cn:'sn', cr:'sr', g:'h', h:'m', i:'i', m:'p',
    mr:'pr', nn:'tn', r:'r', sr:'or', tn:'en', tt:'et', v:'_', x:'b'
  };
  globalThis.__MINING_LOCAL_THREE_EXPORTS__ = (source, url) => {
    if (!new URL(url).pathname.endsWith('/three.core-CxShBFoc.js')) return source;
    return Object.fromEntries(Object.entries(november28).map(([name, key]) => [name, source[key]]));
  };
})();
