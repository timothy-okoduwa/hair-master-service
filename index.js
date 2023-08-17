// ?Use JavaScript to trigger the modal on page load

// document.addEventListener('DOMContentLoaded', function () {
//   var modal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
//   modal.show();
// });

document.addEventListener('DOMContentLoaded', function () {
  // Check if the modal has been shown before
  var modalShown = localStorage.getItem('modalShown');

  // If the modal has not been shown before, show it and set the flag
  if (!modalShown) {
    var modal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
    modal.show();
    localStorage.setItem('modalShown', 'true');
  }
});

//!choosing a location on modal

document.addEventListener('DOMContentLoaded', function () {
  const overlayParts = document.querySelectorAll('.overLayPArt');
  const locationInputHolder = document.querySelector(
    '.locationInputHolder .placeholderr'
  );
  const searchModal = new bootstrap.Modal(
    document.getElementById('searchModal')
  );

  overlayParts.forEach((overlayPart) => {
    overlayPart.addEventListener('click', () => {
      const clickedLocation =
        overlayPart.querySelector('.bodyTextRegular').textContent;
      locationInputHolder.textContent = clickedLocation;
      searchModal.hide(); // Close the modal
    });
  });
});

//? haircut content for top page
document.addEventListener('DOMContentLoaded', function () {
  const messageHolder = document.querySelector('.messageHolder');
  const contents = [
    'Danielle just booked Ademi Hair. Book Now!',
    'John is excited for his new haircut. Join him!',
    "Looking for a stylist? We've got you covered!",
    'Book your next hair appointment with us!',
    'Join our community of satisfied customers today!',
    'Experience the best hair services in town!',
    'Transform your look with our expert stylists!',
    'Get ready for a fantastic hair makeover!',
    'Quality hair care you can trust.',
    'Discover the perfect hairstyle for you!',
    'Unlock a world of stunning hair designs!',
    'Your hair deserves the royal treatment.',
    'Upgrade your hair game with our top-notch stylists!',
    'Elevate your style with our premium hair services.',
    'Experience luxury hair treatments like never before!',
    // Add more contents here...
  ];

  let currentIndex = 0;

  function updateContent() {
    messageHolder.querySelector('.bodyTextRegular').textContent =
      contents[currentIndex];
    currentIndex = (currentIndex + 1) % contents.length;
  }

  updateContent(); // Initial update

  setInterval(updateContent, 5000); // Update content every 5 seconds
});

//adding blur only when scrolled

document.addEventListener('DOMContentLoaded', function () {
  const bothDiv = document.querySelector('.both');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 0) {
      bothDiv?.classList?.add('scrolled');
    } else {
      bothDiv?.classList?.remove('scrolled');
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const datepicker = flatpickr('#datepicker', {
    inline: true, // Display calendar inline
    onChange: function (selectedDates, dateStr, instance) {
      // Update the content of the "Pick a Date" element
      const pickedDateElement = document.getElementById('pickedDate');
      pickedDateElement.textContent = dateStr;

      // Call a function to update the selected date and time placeholders
      updateSelectedDateTime();
    },
  });

  // time picker for appointment
  const timePicker = document.getElementById('timePicker');
  const timeList = document.querySelector('.timeList');
  const pickedTimeInput = document.getElementById('pickedTime');

  const startTime = 6 * 60; // 6:00 AM in minutes
  const endTime = 23 * 60; // 11:00 PM in minutes

  for (let minutes = startTime; minutes <= endTime; minutes += 30) {
    const hour = Math.floor(minutes / 60) % 12 || 12;
    const meridiem = minutes < 720 ? 'am' : 'pm';
    const formattedMinutes = minutes % 60 === 0 ? '00' : minutes % 60;

    const option = document.createElement('div');
    option.textContent = `${hour}:${formattedMinutes} ${meridiem}`;

    option.addEventListener('click', () => {
      // Clear previous selected time
      const selectedTime = timeList.querySelector('.selected');
      if (selectedTime) {
        selectedTime.classList.remove('selected');
      }

      option.classList.add('selected');
      pickedTimeInput.value = option.textContent;

      // Call a function to update the selected date and time placeholders
      updateSelectedDateTime();
    });

    timeList.appendChild(option);
  }

  // Function to format date to month and date (e.g., "22 March")
  function formatDateToMonthAndDate(dateStr) {
    const date = new Date(dateStr);
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    return `${day} ${month}`;
  }

  // Function to update the selected date and time placeholders
  function updateSelectedDateTime() {
    const selectedDate = document.getElementById('pickedDate').textContent;
    const selectedTime = pickedTimeInput.value;

    const selectedDatePlaceholder = document.getElementById('selectedDate');
    const selectedTimePlaceholder = document.getElementById('selectedTime');

    selectedDatePlaceholder.textContent = selectedDate;
    selectedTimePlaceholder.textContent = selectedTime;
  }
});

//change of location

const locationInput = document.getElementById('locationInput');
const offSiteOption = document.getElementById('offSiteOption');
const onSiteOption = document.getElementById('onSiteOption');

// Add click event listeners to options
offSiteOption?.addEventListener('click', () => {
  locationInput.value = 'Off-site';
});

onSiteOption.addEventListener('click', () => {
  locationInput.value = 'On-site';
});

// Define the function to handle the "Yes" button click
function handleYesButtonClick() {
  const cancelButton = document.getElementById('cancelBookingButton');
  // Log a message to the console
  cancelButton.textContent = 'Cancelled';
  cancelButton.style.backgroundColor = '#B1B4BD';
  cancelButton.style.color = '#FFF';

  // Close the modal
}

document.addEventListener('DOMContentLoaded', function () {
  // Attach the event listener to the "Yes" button
  const yesButton = document.querySelector('.buttonYes2');
  yesButton.addEventListener('click', handleYesButtonClick);
});

//add to quantity

function updateTotalPrice() {
  const quantity = parseInt(document.getElementById('quantity').textContent);
  const pricePerUnit = 60; // Replace with the actual price per unit
  const totalPrice = quantity * pricePerUnit;

  // Update the total price element
  const totalPriceElement = document.getElementById('totalPrice');
  totalPriceElement.textContent = `$${totalPrice}`;

  // Update the individual price based on quantity
  const priceElement = document.querySelector('.priceMedium'); // Update the class name here
  const individualPrice = quantity * pricePerUnit;
  priceElement.textContent = `$${individualPrice}`;
}

function incrementQuantity(button) {
  const quantityElement =
    button.parentElement.parentElement.querySelector('.incc');

  let quantity = parseInt(quantityElement.textContent);
  quantity++;
  quantityElement.textContent = quantity;

  updateTotalPrice();
}

function decrementQuantity(button) {
  const quantityElement =
    button.parentElement.parentElement.querySelector('.incc');

  let quantity = parseInt(quantityElement.textContent);
  if (quantity > 1) {
    quantity--;
    quantityElement.textContent = quantity;
    updateTotalPrice();
  }
}

function addToCart(button) {
  const gogreenDiv = document.querySelector('.gog');
  gogreenDiv.style.display = 'block';
  button.classList.add('addedToCart');
  // const cancelButton = document.getElementById('udusus');
  // // Log a message to the console
  // cancelButton.textContent = 'Added to Cart';
  // cancelButton.style.backgroundColor = '#B1B4BD';
  // cancelButton.style.color = '#FFF';
  // cancelButton.style.cursor = 'not-allowed';
  // cancelButton.disabled = true;
}

function closeGreenDiv() {
  const gogreenDiv = document.querySelector('.gog');
  gogreenDiv.style.display = 'none';

  const addToCartButton = document.querySelector('.addedToCart');
  if (addToCartButton) {
    addToCartButton.classList.remove('addedToCart');
  }
}

function DeleteItem() {
  const totalDiv = document.querySelector('.quee');
  totalDiv.style.display = 'none';
  const goredDiv = document.querySelector('.gogm');
  goredDiv.style.display = 'block';
  const cancelButton = document.querySelector('.itemsOrdered');

  // Log a message to the console
  cancelButton.style.display = 'none';
}
function DeleteMany() {
  const totalDiv = document.querySelector('.quee');
  totalDiv.style.display = 'none';
  const cancelButton = document.querySelector('.itemsOrdered');

  // Log a message to the console
  cancelButton.style.display = 'none';
}

function closeRedDiv() {
  const gogreenDiv = document.querySelector('.gogm');
  gogreenDiv.style.display = 'none';

  const addToCartButton = document.querySelector('.addedToCart');
  if (addToCartButton) {
    addToCartButton.classList.remove('addedToCart');
  }
}
