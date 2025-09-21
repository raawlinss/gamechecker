    const games = [
      {
        id: 'elden-ring',
        ad: 'Elden Ring',
        din: 'Belirgin tema yok',
        cokOyunculu: 'Evet (çevrimiçi işbirliği/PvP)',
        customServer: 'Hayır',
        kisisayisi: '1 (co-op ile 2-3 etkileşimli)',
        cikis: '25 Şubat 2022',
        cross: 'Kısıtlı (nesil içi)',
        bitisSuresi: 'Ana hikaye ~50-70 saat',
      },
      {
        id: 'minecraft',
        ad: 'Minecraft',
        din: 'Yok',
        cokOyunculu: 'Evet',
        customServer: 'Evet',
        kisisayisi: 'Tek oyunculu + çok oyunculu (2-∞)',
        cikis: '18 Kasım 2011',
        cross: 'Evet (Bedrock sürümleri arası)',
        bitisSuresi: 'Açık uçlu',
      },
      {
        id: 'gta-v',
        ad: 'Grand Theft Auto V',
        din: 'Yok',
        cokOyunculu: 'Evet (GTA Online)',
        customServer: 'Kısmen (FiveM gibi modlar)',
        kisisayisi: '1 (Online’da çok oyunculu)',
        cikis: '17 Eylül 2013',
        cross: 'Resmi çapraz platform yok',
        bitisSuresi: 'Ana hikaye ~30-35 saat',
      },
      {
        id: 'valorant',
        ad: 'VALORANT',
        din: 'Yok',
        cokOyunculu: 'Evet',
        customServer: 'Hayır (özel lobi var)',
        kisisayisi: '5v5 (10 oyuncu)',
        cikis: '2 Haziran 2020',
        cross: 'Hayır',
        bitisSuresi: 'Maç bazlı, açık uçlu',
      },
      {
        id: 'the-witcher-3',
        ad: 'The Witcher 3: Wild Hunt',
        din: 'Motifler var (kurgusal)',
        cokOyunculu: 'Hayır',
        customServer: 'Hayır',
        kisisayisi: '1',
        cikis: '19 Mayıs 2015',
        cross: 'Hayır',
        bitisSuresi: 'Ana hikaye ~50 saat',
      },
    ];

    const elInput = document.getElementById('search');
    const elResults = document.getElementById('results');

    // Kart oluşturucu (tek tek günceller, yeniden çizim yok)
    function renderCard(item) {
      const card = document.createElement('article');
      card.className = 'rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur-sm hover:bg-white/10 transition-colors';
      card.setAttribute('data-id', item.id);

      const title = document.createElement('h3');
      title.className = 'text-white font-semibold text-lg';
      title.textContent = item.ad;

      const grid = document.createElement('div');
      grid.className = 'mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white/90';

      const row = (label, value) => {
        const r = document.createElement('div');
        r.className = 'flex items-center justify-between gap-3 bg-white/5 rounded-lg px-3 py-2 border border-white/10';
        const l = document.createElement('span');
        l.className = 'text-white/60';
        l.textContent = label;
        const v = document.createElement('span');
        v.className = 'font-medium text-white';
        v.textContent = value;
        r.append(l, v);
        return r;
      };

      grid.append(
        row('Din var mı?', item.din),
        row('Çok oyunculu mu?', item.cokOyunculu),
        row('Custom Server kurma?', item.customServer),
        row('Kaç kişilik?', item.kisisayisi),
        row('Ne zaman çıktı?', item.cikis),
        row('Cross platform?', item.cross),
        row('Kaç saatte biter?', item.bitisSuresi),
      );

      card.append(title, grid);
      return card;
    }

    function render(list) {
      // Seçici güncelleme: önceki çocukları karşılaştırmak yerine basitçe temizliyoruz çünkü liste küçük.
      elResults.innerHTML = '';
      if (!list.length) {
        const empty = document.createElement('div');
        empty.className = 'text-white/60 text-center';
        empty.textContent = 'Hiç sonuç bulunamadı';
        elResults.appendChild(empty);
        return;
      }
      const frag = document.createDocumentFragment();
      list.forEach(item => frag.appendChild(renderCard(item)));
      elResults.appendChild(frag);
    }

    // Basit arama: adı metin içinde geçiyorsa eşleştir
    function search(q) {
      const term = q.trim().toLowerCase();
      if (!term) { elResults.innerHTML = ''; return; }
      // "oyunlar" (veya "hepsi" ya da "*") yazılırsa tüm listeyi göster
      if (term === 'oyunlar' || term === 'hepsi' || term === '*') {
        render(games);
        return;
      }
      const filtered = games.filter(g => g.ad.toLowerCase().includes(term));
      render(filtered);
    }

    // Anlık arama ve Enter desteği
    elInput.addEventListener('input', (e) => {
      search(e.target.value);
    });
    elInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        search(e.target.value);
      }
    });
