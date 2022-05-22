describe('Testing this with Typescript', () => {

    it('TodoMVC.com Todo Test', () => {
        Cypress.on('uncaught:exception', (err, runnable) => {
            //Disable Exception handling due to website issues 
            return false
           })
        cy.visit('https://todomvc.com/');
        cy.contains('Polymer').click();
        Cypress.on('uncaught:exception', (err, runnable) => {
            //Enable Exception Handling
            return true
           });

           const firstTodoText = 'First Todo';
           const secondTodoText = 'Second Todo';
           const modifiedSecondTodo = 'Modified Todo';

           enterNewTodo(firstTodoText);
           getTodoElement(1).invoke("text").should("eq",firstTodoText);

           enterNewTodo(secondTodoText); 
           getTodoElement(2).invoke("text").should("eq",secondTodoText);

           editTodo(2,modifiedSecondTodo ); 
           getTodoElement(2).invoke("text").should("eq",modifiedSecondTodo); 

    })

    const getTodoElement = (todo:number) =>{
        return cy.get(`.todoapp ul >li:nth-child(${todo}) label`);
    } 

    const enterNewTodo = (todoText:string)=>{
        cy.get('#new-todo').type(todoText).type('{enter}');
    }

    const editTodo = (todo:number, editText:string)=>{
        getTodoElement(todo).dblclick();
        cy.get('#edit').clear().type(editText).type('{enter}');
    }
})