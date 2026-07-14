(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canvas = document.getElementById("networkCanvas");

  if (canvas && !reduceMotion) {
    const ctx = canvas.getContext("2d");
    const palette = [
      "rgba(35, 216, 255, 0.78)",
      "rgba(0, 229, 168, 0.58)",
      "rgba(124, 92, 255, 0.66)",
      "rgba(232, 193, 86, 0.5)",
    ];
    let dpr = 1;
    let width = 0;
    let height = 0;
    let nodes = [];

    const createNodes = () => {
      const count = Math.min(96, Math.max(42, Math.floor(window.innerWidth / 18)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.16 * dpr,
        vy: (Math.random() - 0.5) * 0.16 * dpr,
        r: (Math.random() * 1.6 + 0.6) * dpr,
        c: palette[Math.floor(Math.random() * palette.length)],
      }));
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.floor(window.innerWidth * dpr);
      height = Math.floor(window.innerHeight * dpr);
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      createNodes();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        ctx.beginPath();
        ctx.fillStyle = node.c;
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fill();
      });

      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const limit = 150 * dpr;
          if (distance < limit) {
            ctx.strokeStyle = `rgba(61, 217, 255, ${0.13 * (1 - distance / limit)})`;
            ctx.lineWidth = 0.55 * dpr;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize, { passive: true });
    resize();
    draw();
  }

  if (!reduceMotion) {
    const deck = document.querySelector(".ai-command-deck");
    if (deck) {
      window.addEventListener(
        "pointermove",
        (event) => {
          const x = (event.clientX / window.innerWidth - 0.5) * 8;
          const y = (event.clientY / window.innerHeight - 0.5) * -8;
          deck.style.transform = `perspective(1100px) rotateY(${x}deg) rotateX(${y}deg)`;
        },
        { passive: true },
      );
    }
  }
})();
