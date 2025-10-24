async function vote(option) {
  const res = await fetch(`/vote?option=${option}`);
  const data = await res.json();
  displayResults(data);
}

async function loadResults() {
  const res = await fetch("/results");
  const data = await res.json();
  displayResults(data);
}

function displayResults(data) {
  const div = document.getElementById("results");
  div.innerHTML = `
    <p>Tea: ${data.tea} votes</p>
    <p>Coffee: ${data.coffee} votes</p>
  `;
}

loadResults();