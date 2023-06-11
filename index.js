// Get the draggable items and the droppable area
const items = document.querySelectorAll('.item');
const droppableArea = document.querySelector('.container:nth-of-type(2)');

// Add event listeners to the items for drag events
items.forEach(item => {
  item.addEventListener('dragstart', dragStart);
  item.addEventListener('dragend', dragEnd);
});

// Add event listeners to the droppable area for drop events
droppableArea.addEventListener('dragover', dragOver);
droppableArea.addEventListener('dragenter', dragEnter);
droppableArea.addEventListener('dragleave', dragLeave);
droppableArea.addEventListener('drop', drop);

// Store the dragged item and apply the dragging style
let draggedItem = null;

function dragStart(event) {
  draggedItem = this;
  this.classList.add('dragging');
  event.dataTransfer.effectAllowed = 'move';
}

function dragEnd() {
  this.classList.remove('dragging');
}

function dragOver(event) {
  event.preventDefault();
}

function dragEnter(event) {
  event.preventDefault();
  droppableArea.classList.add('highlight');
}

function dragLeave() {
  droppableArea.classList.remove('highlight');
}

function drop() {
  droppableArea.appendChild(draggedItem);
  draggedItem = null;
  droppableArea.classList.remove('highlight');
  showSuccessMessage();
}

function showSuccessMessage() {
  const messageContainer = document.createElement('div');
  messageContainer.classList.add('success-message');
  messageContainer.textContent = 'Item dropped successfully!';
  document.body.appendChild(messageContainer);
  setTimeout(() => {
    messageContainer.remove();
  }, 2000);
}

// Reset button functionality
const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', resetContainers);

function resetContainers() {
  items.forEach(item => {
    item.classList.remove('dragging');
    document.querySelector('.container:nth-of-type(1)').appendChild(item);
  });
  draggedItem = null;
  const successMessage = document.querySelector('.success-message');
  if (successMessage) {
    successMessage.remove();
  }
}
