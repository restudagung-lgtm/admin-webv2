/*
  pengaturan.js
  -------------
  Halaman /pengaturan/: jumlah meja di alun-alun & ganti password admin.
*/

async function init(){
  const acc = await requireAdminAuth();
  if(!acc) return;
  const dashContent = renderDashShell('pengaturan');
  const cfg = await sGet('config:totalTables', true);
  dashContent.innerHTML = `
  <div class="card">
    <h3>Jumlah Meja di Alun-Alun</h3>
    <p class="muted" style="margin:4px 0 10px;">Dipakai untuk denah lokasi & pengurutan toko terdekat di seluruh sistem.</p>
    <div class="field"><label>Jumlah meja</label><input id="setTotal" type="number" min="1" max="50" value="${cfg?.total || 16}"></div>
    <button class="btn btn-primary" onclick="saveTotalTables()">Simpan</button>
    <p id="totalMsg" class="muted" style="margin-top:8px;"></p>
  </div>
  <div class="card">
    <h3>Ganti Password Admin</h3>
    <div class="field" style="margin-top:10px;"><label>Password baru</label>
      <div class="pwd-wrap">
        <input id="newAdminPass" type="password" placeholder="minimal 6 karakter">
        <button type="button" class="pwd-toggle ic-btn" onclick="togglePwd('newAdminPass', this)">${ic('eye',16)}</button>
      </div>
    </div>
    <button class="btn btn-outline" onclick="changeAdminPassword()">Simpan Password Baru</button>
    <p id="passMsg" class="muted" style="margin-top:8px;"></p>
  </div>`;
  mountIcons();
}

async function saveTotalTables(){
  const n = Number(document.getElementById('setTotal').value) || 16;
  await sSet('config:totalTables', {total:n}, true);
  document.getElementById('totalMsg').textContent = 'Tersimpan.';
}

async function changeAdminPassword(){
  const p = document.getElementById('newAdminPass').value;
  const msg = document.getElementById('passMsg');
  if(!p || p.length < 6){ msg.textContent = 'Password minimal 6 karakter.'; return; }
  const acc = await sGet('admin:owner', true) || {};
  acc.password = p;
  await sSet('admin:owner', acc, true);
  msg.textContent = 'Password admin diperbarui.';
}

init();
