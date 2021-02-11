import { filterInputTemplate } from '../templates/filter-input.js';
import { optionsButtonTemplate } from '../templates/options-button.js';
import openModal from './modal.js';
import { getEmployees } from './service.js';
import { updateTable } from './utils.js';


export default function createTopOptionsBlock() {
    const topOptionsBlock = $("#top-options-block");

    const inputTemplate = _.template(filterInputTemplate);
    const nameInput = inputTemplate({
        id: 'filter-name',
        type: 'name',
        placeholder: 'Vasja',
        title: 'Name'
    });
    const surnameInput = inputTemplate({
        id: 'filter-surname',
        type: 'surname',
        placeholder: 'Pupkin',
        title: 'Surname'
    });

    const buttonTemplate = _.template(optionsButtonTemplate);

    const applyButtonHTML = buttonTemplate({
        className: 'btn\ btn-outline-secondary',
        title: 'Apply'
    });
    const applyButton = $(applyButtonHTML);
    applyButton.on('click', () => {
        getEmployees()
            .then(data => {
                updateTable(data);
            });
    });

    const addButtonHTML = buttonTemplate({
        className: 'btn\ btn-success',
        title: 'Create'
    });
    const addButton = $(addButtonHTML);
    addButton.on('click', openModal);

    topOptionsBlock.append(nameInput);
    topOptionsBlock.append(surnameInput);
    topOptionsBlock.append(applyButton);
    topOptionsBlock.append(addButton);
}