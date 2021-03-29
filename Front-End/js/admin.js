const DELETE = 'DELETE';
const endPointRoot = "COMP4537/assignment1/v1/quotes";
const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
let quoteCount = 0;
const xhttp = new XMLHttpRequest();

const createButtonDelete = (id, num) => {
  id = id ? id : null;
  const btnDelete = document.createElement("button");
  btnDelete.setAttribute("id", `btn-delete-${quoteCount}`);
  btnDelete.setAttribute("class", "active btn btn-danger btn-sm");
  btnDelete.setAttribute("onclick", `deleteQuote(${id}, ${num})`);
  btnDelete.innerHTML = "Delete";
  return btnDelete;
}

const createButtonUpdate = (id, num) => {
  id = id ? id : null;
  const btnUpdate = document.createElement("button");
  btnUpdate.setAttribute("id", `btn-update-${num}`);
  btnUpdate.setAttribute("class", "active btn btn-sm btn-warning");
  btnUpdate.setAttribute("onclick", `updateQuote(${id}, ${num})`)
  btnUpdate.innerHTML = "Update";
  return btnUpdate;
}

const createDivAuthor = (author, num) => {
  const authorTag = document.createElement("h4");
  const authorTagText = document.createTextNode("Author:");
  authorTag.appendChild(authorTagText);

  const inputAuthor = document.createElement("input");
  inputAuthor.setAttribute("type", "text");
  inputAuthor.setAttribute("id", `input-author-${num}`);
  inputAuthor.value = author ? author : null;

  const divAuthor =  document.createElement("div");
  divAuthor.appendChild(authorTag);
  divAuthor.appendChild(inputAuthor);
  return divAuthor;
}

const createDivQuote = (quote, num) => {
  const quoteTag = document.createElement("h4");
  const quoteTagText = document.createTextNode("Quote:");
  quoteTag.appendChild(quoteTagText);

  const textAreaQuote = document.createElement("textarea");
  textAreaQuote.setAttribute("type", "text");
  textAreaQuote.setAttribute("id", `input-quote-${num}`);
  textAreaQuote.value = quote ? quote : null;

  const divQuote =  document.createElement("div");
  divQuote.appendChild(quoteTag);
  divQuote.appendChild(textAreaQuote);
  return divQuote;
}

const deleteQuote = (id, num) => {
  xhttp.open(DELETE, endPointRoot, true);
  xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  const payload = `id=${id}`;
  xhttp.send(payload);
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
    }
  }
  document.getElementById(`quote-${num}`).remove();
}

const loadQuotes = () => {
  xhttp.open(GET, `${endPointRoot}?isAdmin=true`, true);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const payload = JSON.parse(this.response);
      console.log(payload);
      payload.forEach((row) => {
        renderQuote(row.ID, row.QUOTE, row.AUTHOR, true);
      });
    }
  }
}

const renderQuote = (id, quote, author, isAdmin) => {
  const div = document.createElement("div");
  div.setAttribute("id", `quote-${quoteCount}`);

  const btnDelete = createButtonDelete(id, quoteCount);
  const btnUpdate = createButtonUpdate(id, quoteCount);

  const divButtons = document.createElement("div");
  divButtons.setAttribute("class", "text-center quote-buttons");
  divButtons.appendChild(btnUpdate);
  divButtons.appendChild(btnDelete);

  let root = document.getElementById("root");
  root.appendChild(div);
  div.appendChild(createDivQuote(quote, quoteCount));
  div.appendChild(document.createElement("br"));
  div.appendChild(createDivAuthor(author, quoteCount));
  div.appendChild(document.createElement("br"));
  div.appendChild(divButtons);
  div.appendChild(document.createElement("br"));
  quoteCount++;
}

const updateQuote = (id, num) => {
  const authorVal = document.getElementById(`input-author-${num}`).value;
  const quoteVal = document.getElementById(`input-quote-${num}`).value;

  let payload = JSON.stringify({
    id: id,
    author: authorVal,
    quote: quoteVal,
  });

  const METHOD = id ? PUT : POST;
  xhttp.open(METHOD, endPointRoot, true);
  xhttp.setRequestHeader('Content-type', 'application/json');
  xhttp.send(payload);

  if (METHOD === PUT) return;

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const id = JSON.parse(this.response)[0].ID ? JSON.parse(this.response)[0].ID : null;
      document.getElementById(`btn-update-${num}`).setAttribute("onclick", `updateQuote(${id}, ${num})`);
      document.getElementById(`btn-delete-${num}`).setAttribute("onclick", `deleteQuote(${id}, ${num})`);
    }
  }
}