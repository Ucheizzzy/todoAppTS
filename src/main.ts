import './css/style.css'
import FullList from './model/FullList'
import ListItem from './model/ListItem'
import ListTemplate from './templates/ListTemplate'

const initApp = (): void => {
  const fullList = FullList.instance
  const template = ListTemplate.instance

  //Add listener to new entry form submit
  const itemEntryForm = document.getElementById(
    'itemEntryForm'
  ) as HTMLFormElement

  itemEntryForm.addEventListener('submit', (event: SubmitEvent): void => {
    event.preventDefault()

    //get the new item value
    const input = document.getElementById('newItem') as HTMLInputElement

    const newEntryText: string = input.value.trim()
    //if the input is empty
    if (!newEntryText.length) return

    //calculate the item id
    const itemId: number = fullList.list.length
      ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
      : 1

    //create new item
    const newItem = new ListItem(itemId.toString(), newEntryText)

    //add new item to full list
    fullList.addItem(newItem)
    input.value = ''
    //re-render list with new item included
    template.render(fullList)
  })
  //add listener to clear button
  const clearItems = document.getElementById(
    'clearItemsButton'
  ) as HTMLButtonElement

  clearItems.addEventListener('click', () => {
    fullList.clearList()
    template.clear()
  })

  //load initial data
  fullList.load()

  //initial render of template
  template.render(fullList)
}

document.addEventListener('DOMContentLoaded', initApp)
