document.addEventListener('DOMContentLoaded', () => {
  const tbody = document.getElementById('tbody-pessoas');

  function showMessage(message) {
    tbody.innerHTML = `<tr><td colspan="4" class="muted">${message}</td></tr>`;
  }

  function renderRows(pessoas) {
    if (!Array.isArray(pessoas) || pessoas.length === 0) {
      showMessage('Nenhuma pessoa encontrada.');
      return;
    }
    const rows = pessoas.map(p => {
      const id = p.id ?? '';
      const nome = p.nome ?? '';
      const idade = p.idade ?? '';
      return `<tr>
        <td>${escapeHtml(String(id))}</td>
        <td>${escapeHtml(String(nome))}</td>
        <td>${escapeHtml(String(idade))}</td>
        <td>
          <center><button class="btn-deletar" data-id="${escapeHtml(String(id))}"><div class="glyphicon glyphicon-trash"></div> Deletar</button></center>
        </td>
      </tr>`;
    }).join('\n');
    tbody.innerHTML = rows;

    tbody.querySelectorAll('.btn-deletar').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const id = btn.dataset.id;
        await deletarRegistro(id);
      });
    });
  }
  
  async function deletarRegistro(id) {
    const confirmed = confirm(`Confirma a exclusão da pessoa com ID ${id}?`);
    if (!confirmed) return;

    try {
      const res = await fetch(`https://special-space-doodle-5gp756x9r6q6c7qqq-8080.app.github.dev/api/pessoas/${id}`, {
        method: 'DELETE',
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        alert('Pessoa excluída com sucesso.');
        location.reload();
      } else {
        alert(`Erro ao excluir pessoa. HTTP ${res.status}`);
      }
    } catch (err) {
      console.error('Erro ao excluir pessoa:', err);
      alert('Erro ao excluir pessoa. Veja o console para mais detalhes.');
    }
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, ch => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[ch]));
  }

  async function fetchJsonFrom(endpoint) {
    const res = await fetch(endpoint, { headers: { 'Accept': 'application/json', 'Access-Control-Allow-Origin': '*' } });
    if (!res.ok) throw new Error(`${endpoint} -> HTTP ${res.status}`);
    const ct = (res.headers.get('content-type') || '').toLowerCase();
    if (ct.includes('application/json')) return res.json();
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch {
      throw new Error(`${endpoint} -> conteúdo não é JSON (content-type: ${ct})`);
    }
  }

  (async () => {
    showMessage('Carregando...');
    const ep = 'https://special-space-doodle-5gp756x9r6q6c7qqq-8080.app.github.dev/api/pessoas';
    try {
      const data = await fetchJsonFrom(ep);
      renderRows(data);
      return;
    } catch (err) {
      console.warn('fetch failed for', ep, err);
    }

    showMessage('Erro ao carregar os dados. Verifique o endpoint /api/pessoas (veja console).');
    console.error('Nenhum endpoint respondeu com JSON. URL:', ep);
  })();
});