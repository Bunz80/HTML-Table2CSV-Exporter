// Definizione della funzione per esportare i dati della tabella in CSV
function esportaTabellaInCSV() {
  // Seleziona la tabella
  const tabella = document.querySelector('.table');

  // Variabile per contenere i dati in formato CSV
  let csv = [];

  // Ottiene le righe della tabella
  const righe = tabella.querySelectorAll('tr');
  
  // Itera su ogni riga della tabella
  righe.forEach((riga, indiceRiga) => {
    let datiRiga = [];

    // Se è l'header della tabella
    if (indiceRiga === 0) {
      const intestazioni = riga.querySelectorAll('th');
      intestazioni.forEach(intestazione => {
        datiRiga.push(`"${intestazione.textContent}"`);
      });
    } else {
      // Per le righe con i dati
      const celle = riga.querySelectorAll('td');
      celle.forEach((cella, indiceCella) => {
        if (indiceCella === 0) { // Colonna della selezione
          const selezione = cella.querySelector('select');
          datiRiga.push(`"${selezione.options[selezione.selectedIndex].text}"`);
        } else if (indiceCella < celle.length - 1) { // Esclude l'ultima colonna delle azioni
          const input = cella.querySelector('input');
          datiRiga.push(`"${input ? input.value : cella.textContent}"`);
        }
      });
    }
    
    // Aggiunge la riga al CSV
    csv.push(datiRiga.join(','));
  });

  // Converti l'array CSV in stringa e sostituisci i punti con le virgole per il formato numerico
  const csvString = csv.join('\n').replace(/\./g, ',');

  // Crea un elemento link per il download
  const linkDownload = document.createElement('a');
  linkDownload.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvString);
  linkDownload.download = 'dati_tabella.csv';

  // Aggiunge il link al body e lo clicca per scaricare
  document.body.appendChild(linkDownload);
  linkDownload.click();
  document.body.removeChild(linkDownload);
}

// Esecuzione della funzione per esportare i dati in CSV
esportaTabellaInCSV();
