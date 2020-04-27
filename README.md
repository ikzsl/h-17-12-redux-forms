# Библиотека Redux Forms
Ещё одно место, напрашивающееся на автоматизацию — формы. Работа с формами в React настоящая головная боль. Каждый новый элемент требует синхронизации с состоянием и написанием дополнительного кода на всех уровнях.

```javascript
import React from 'react';

class Form extends React.Component {
  updateNewTaskText = (e) =>
    this.props.updateNewTaskText({ text: e.target.value });

  render() {
    const { newTaskText } = this.props;

    return <form action="" className="form-inline">
      <div className="form-group mx-sm-3">
        <input type="text" required
          value={newTaskText} onChange={this.updateNewTaskText} />
      </div>
    </form>;
  }
}
```

Этого можно избежать, подключив библиотеку наподобие `redux-form`. Документация этого пакета поистине огромна. Множество вариантов использования и способов кастомизации. Чтобы не сойти с ума, в уроке мы рассмотрим только базовые возможности этой библиотеки.

Как и в случае с самим Redux, подключить Redux Form целая история. Начнём по порядку:

1. Автоматизация синхронизации с контейнером подразумевает наличие специального редьюсера:

```javascript
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  // По умолчанию свойство должно называться form
  form: formReducer,
  /* ... */
});
```
2. Теперь под каждую форму нужно выделять отдельный компонент и оборачивать его в компонент ReduxForm.

```javascript
import { reduxForm } from 'redux-form';

class NewTaskForm extends React.Component {
  // ...
}

export default reduxForm({
  form: 'newTask',
})(NewTaskForm);
```

Обратите внимание на свойство `form`, оно задаёт имя ключа, под которым данные текущей формы будут храниться в Redux.

3. Вместо использования стандартных компонентов React для элементов формы, Redux Form поставляется со своими механизмами. Потребность вполне понятная, иначе не сделать автоматическую синхронизацию.

```javascript
import  { Field } from 'redux-form';

// ...

render() {
  return <form className="form-inline">
    <div className="form-group mx-3">
      <Field name="text" required component="input" type="text" />
    </div>
    <button type="submit" className="btn btn-primary btn-sm">Add</button>
  </form>;
}
```
Эта часть Redux Form очень сильно кастомизируется. За подробностями прошу в официальную документацию.

4. Остался последний шаг — отправка формы и работа с её данными.

```javascript
class NewTaskForm extends React.Component {
  addTask = (values) => {
    this.props.addTask({ task: values });
  }

  render() {
    return <form onSubmit={this.props.handleSubmit(this.addTask)}>
      {/* ... */}
      <button type="submit" className="btn btn-primary btn-sm">Add</button>
    </form>;
  }
}
```
Redux Form прокидывает в формы целую россыпь различных свойств. Главное из них — функция `handleSubmit`. Её необходимо вызвать на `onSubmit` формы, передав туда свой собственный обработчик. После отправки формы в этот обработчик попадут все значения из формы в виде объекта, где свойство — это имя элемента формы.

Теперь расширение и изменение любой формы станет настоящим праздником. Достаточно изменить саму форму и волшебным образом в обработчик начнут приходить новые данные.

А дальше начинаются нюансы:

- Как очистить форму после отправки? В обработчике отправки можно вызывать функцию `this.props.reset()` и форма будет сброшена в первоначальный вид.

- Как задать параметры по умолчанию? Достаточно передать в компонент пропс `initialValues`.

