//IIFE
(function(){
  const url = 'http://localhost:3000/todos';

  async function displayTodos(){
    //request from API
    const todos = await getTodos();
    //create HTML elements
    const html = createHtml(todos);
    //put those elements in the body
    const section = document.querySelector('.js-todo-list');
    section.append(html);
    // delegam click-ul pe checkboxuri la todo-list
    section.addEventListener('click', handleCheckboxClick);
  }

  function getTodos(){
    return fetch(url)
            .then(res => res.json());
  }

  function createHtml(todos){
    const fragment = document.createDocumentFragment();

    for (const todo of todos){
      const text = document.createElement('p');
      text.innerHTML = todo.text;

      const check = document.createElement('input');
      check.type = 'checkbox';
      check.checked = todo.completed;
      check.setAttribute('data-todo-id', todo.id);

      text.prepend(check);
      fragment.append(text);
    }
    return fragment;
  }

  displayTodos();
  const createTodoForm = document.querySelector('.js-form');
  createTodoForm.addEventListener('submit', createTodo);
  
  function createTodo(e) {
    //ia textul din input
    // const text = createTodoForm.querySelector('input').value;
    const text = e.target.querySelector('input').value;

    //trimita textul la server
    addTodo(text);

    //prevenim submit-ul/reincarcarea paginii
    e.target.preventDefault();
  }

  function addTodo(text) {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: text,
        userId: 1,
        completed: false
      })
    })
  }

  function handleCheckboxClick(e) {
    if (e.target.type !== 'checkbox') {
      return;
    }
    
    const todoId = e.target.getAttribute('data-todo-id');
    // request pentru server pentru modificare
    fetch(`${url}/${todoId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        completed: e.target.checked
      })
    });
  }

})();