import { getEmployees } from '../service.js';
import { updateTable } from '../utils.js';
import { paginationTemplate } from '../../templates/pagination.js';

const paginationButtons = [{
        id: 'previous-button',
        title: 'Previous',
        onClick: () => handleClick(),
        options: 'disabled="true"',
    },
    {
        id: 'page-number',
        title: '1',
        onClick: null,
        options: 'disabled="true"',
    },
    {
        id: 'next-button',
        title: 'Next',
        onClick: () => handleClick(true)
    },
];

async function handleClick(isNext = false) {
    const pageNumDiv = $('#page-number');
    const pageNum = Number.parseInt(pageNumDiv.text());
    const newPageNum = isNext ? pageNum + 1 : pageNum - 1;

    const newDataJSON = await getEmployees({ page_num: newPageNum });

    if (newDataJSON.length !== 0) {
        updateTable(newDataJSON, newPageNum);
        pageNumDiv.html(newPageNum);
    }
}

export default function createPagination() {
    const paginationTempl = _.template(paginationTemplate);
    $('#pagination').append(paginationTempl({ items: paginationButtons }));

    paginationButtons.forEach(button => {
        if (button.onClick) {
            $(`#${button.id}`).click(button.onClick);
        }
    });

    document.getElementById('previous-button').addEventListener('mouseover', () => {
        const pageNum = Number.parseInt($('#page-number').text());
        if (pageNum === 1) {
            $('#previous-button').prop('disabled', true);
        }
        $('#next-button').prop('disabled', false);
    });

    document.getElementById('next-button').addEventListener('mouseover', () => {
        $('#previous-button').prop('disabled', false);
    });
}