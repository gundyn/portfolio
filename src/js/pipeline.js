/* ============================================================
   Pipeline Interactivity
   Add this to your inline <script> in index.html,
   or paste into a separate file and reference it.
   ============================================================ */

   (function () {

    // ── Stage node tooltips ────────────────────────────────────
  
    const stageDetails = {
      0: { title: 'Push',    detail: 'git push origin main triggers the workflow via GitHub webhook.' },
      1: { title: 'Trigger', detail: 'GitHub Actions detects the push and spins up runners for each job.' },
      2: { title: 'Build',   detail: 'html-validate and stylelint run in parallel — zero build artifacts needed.' },
      3: { title: 'Test',    detail: 'Cypress E2E suite runs headless in Chrome, validating page structure and links.' },
      4: { title: 'Deploy',  detail: 'peaceiris/actions-gh-pages pushes to the gh-pages branch on a clean pass.' },
      5: { title: 'Live',    detail: 'Cloudflare serves the updated site from edge cache within seconds of deploy.' }
    };
  
    const nodes = document.querySelectorAll('.stage-node');
  
    nodes.forEach(function (node, index) {
      node.style.cursor = 'pointer';
  
      node.addEventListener('click', function (e) {
        e.stopPropagation();
  
        // Remove any existing tooltips
        document.querySelectorAll('.stage-tooltip').forEach(function (t) {
          t.remove();
        });
  
        const existing = node.querySelector('.stage-tooltip');
        if (existing) return;
  
        const info = stageDetails[index];
        if (!info) return;
  
        const tooltip = document.createElement('div');
        tooltip.className = 'stage-tooltip';
        tooltip.innerHTML =
          '<strong>' + info.title + '</strong>' +
          '<p>' + info.detail + '</p>';

        // Prevent edge clipping for first and last node
        if (index === 0) {
          tooltip.style.left = '0';
          tooltip.style.right = 'auto';
          tooltip.style.transform = 'translateX(0) translateY(4px)';
        } else if (index === nodes.length - 1) {
          tooltip.style.left = 'auto';
          tooltip.style.right = '0';
          tooltip.style.transform = 'translateX(0) translateY(4px)';
        }

        node.appendChild(tooltip);

        // Double rAF ensures element is painted before transition fires
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            if (index === 0 || index === nodes.length - 1) {
              tooltip.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
              tooltip.style.transform = 'translateX(0) translateY(0)';
              tooltip.style.opacity = '1';
            } else {
              tooltip.classList.add('stage-tooltip--visible');
            }
          });
        });
      });
    });
  
    // Close tooltip on outside click
    document.addEventListener('click', function () {
      document.querySelectorAll('.stage-tooltip').forEach(function (t) {
        t.remove();
      });
    });
  
  
    // ── Simulate run button ────────────────────────────────────
  
    const meta = document.querySelector('.pipeline-meta');
    if (meta) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'pipeline-simulate-btn';
      btn.textContent = 'Simulate run';
      meta.appendChild(btn);
  
      btn.addEventListener('click', function () {
        if (btn.disabled) return;
        btn.disabled = true;
        btn.textContent = 'Running…';
  
        // Reset all nodes to pending
        nodes.forEach(function (node) {
          node.classList.remove('active', 'sim-complete');
          const status = node.querySelector('.stage-status');
          if (status) {
            status.className = 'stage-status pending';
          }
        });
  
        // Sequentially activate each node
        nodes.forEach(function (node, index) {
          setTimeout(function () {
            node.classList.add('active');
            const status = node.querySelector('.stage-status');
            if (status) {
              status.className = 'stage-status passing';
            }
  
            // After last node
            if (index === nodes.length - 1) {
                setTimeout(function () {
                  nodes.forEach(function (n) {
                    n.classList.remove('active');
                    const s = n.querySelector('.stage-status');
                    if (s) { s.className = 'stage-status pending'; }
                  });
                  btn.disabled = false;
                  btn.textContent = 'Simulate run';
                }, 1500);
              }
          }, index * 600);
        });
      });
    }
  
  
    // ── Pipeline card hover detail reveal ─────────────────────
  
    document.querySelectorAll('.pipeline-card').forEach(function (card) {
      card.addEventListener('mouseenter', function () {
        card.classList.add('pipeline-card--hovered');
      });
      card.addEventListener('mouseleave', function () {
        card.classList.remove('pipeline-card--hovered');
      });
    });
  
  }());