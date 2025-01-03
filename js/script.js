// Строгий режим
"use strict"

document.addEventListener("click", documentActions);


function documentActions(e) {
	const targetElement = e.target;

	if (targetElement.closest('.icon-menu')) {
		document.body.classList.toggle('menu-open');
	}
	if (targetElement.closest('[data-spoller]')) {
		const currentElement = targetElement.closest('[data-spoller]');
		if (!currentElement.nextElementSibling.classList.contains('--sliding')) {
			currentElement.classList.toggle('active');
		}
		slideToggle(currentElement.nextElementSibling);
	}
	if (targetElement.closest('.rating__input')) {
		const currentElement = targetElement.closest('.rating__input')
		const rating = currentElement.closest('.rating')
		if (rating.classList.contains('rating--set')) {
			starRatingGet(rating, currentElement)
		}
	}
	if (targetElement.closest('[data-tabs-button]')) {
		const currentElement = targetElement.closest('[data-tabs-button]')
		setTab(currentElement)
	}
	if (targetElement.closest('[data-delete-button]')) {
		const currentElement = targetElement.closest('[data-delete-button]')
		deleteElement(currentElement)
	}
	if (targetElement.closest('[data-password-button]')) {
		const currentElement = targetElement.closest('[data-password]')
		const input = currentElement.querySelector('[data-password-input]')
		const showpassButton = currentElement.querySelector('[data-password-button]')
		showPassword(currentElement, input, showpassButton)
	}
	if (targetElement.closest('.contact-details__change')) {
		const currentElement = targetElement.closest('.contact-details__change')
		const contactItem = targetElement.closest('.contact-details__item')
		const contactInput = contactItem.querySelector('.contact-details__input')
		changeData(currentElement, contactItem, contactInput)
	}
	if (targetElement.closest('.item-adress__remove')) {
		const addressItem = targetElement.closest('.item-adress')
		addressItem.remove()
	}
	if (targetElement.closest('.item-wishlist__delete-button')) {
		const wishlistItem = targetElement.closest('.item-wishlist')
		let question = confirm('Are you sure you want to delete this?')
		question == true ? wishlistItem.remove() : null
	}
}

// CHANGE DATA
function changeData(currentElement, contactItem, contactInput) {
	if (contactInput.disabled) {
		contactInput.disabled = false
		contactInput.focus()
		currentElement.textContent = 'Save'
	} else {
		contactInput.disabled = true
		currentElement.textContent = 'Change'
	}
}

// RATING
const ratings = document.querySelectorAll('[data-rating]')

if (ratings) {
	ratings.forEach(rating => {
		const currentValue = +rating.dataset.rating
		currentValue ? starRatingSet(rating, currentValue) : null
	})
}

function starRatingGet(rating, currentElement) {
	const ratingValue = +currentElement.value
	// Тут відправка оцінки (ratingValue) на бекенд...
	// Уявімо, що ми отримали середню оцінку 3.2
	const resultRating = 3.2
	starRatingSet(rating, resultRating)
}

function starRatingSet(rating, value) {
	
	const ratingValue = rating.querySelector('.rating__value')
	
	if (ratingValue) {
		ratingValue.textContent = value
	}
	
	const ratingItems = rating.querySelectorAll('.rating__item')
	const resultFullItems = parseInt(value)
	const resultPartItem = value - resultFullItems

	ratingItems.forEach((ratingItem, index) => {
		ratingItem.classList.remove('active')
		ratingItem.querySelector('span') ? ratingItems[index].querySelector('span').remove() : null

		if (index <= (resultFullItems -1)) {
			ratingItem.classList.add('active')
		}
		if (index === resultFullItems && resultPartItem) {
			ratingItem.insertAdjacentHTML("beforeend", `<span style="width:${resultPartItem * 100}%"></span>`)
		}
	})
}

// SPOLLERS
const spollersFAQ = document.querySelectorAll('[data-spoller]');

if (spollers.length) {
	spollers.forEach(spoller => {
		spoller.dataset.spoller !== 'open' ? spoller.nextElementSibling.hidden = true : null

		// FILTER
		const filterTitle = document.querySelector('.filter__title') 
		if (filterTitle) {
			const breakPoint = `(max-width: 998px)`
			const matchMedia = window.matchMedia(breakPoint)
			matchMedia.addEventListener('change', (e) => {
				const isTrue = e.matches
				if (isTrue) {
					slideUp(filterTitle.nextElementSibling)
					filterTitle.classList.remove('active')
				} else {
					slideDown(filterTitle.nextElementSibling)
					filterTitle.classList.add('active')
				}
			})
		}
	});
}
let slideDown = (target, duration = 500) => {
	if (!target.classList.contains('--sliding')) {
		target.classList.add('--sliding');
		target.hidden = false;
		let height = target.offsetHeight;

		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;

		target.style.overflow = 'hidden';
		target.style.height = 0;

		target.offsetHeight;

		target.style.transitionProperty = `height, margin, padding`;
		target.style.transitionDuration = `${duration}ms`;

		target.style.height = `${height}px`;

		target.style.removeProperty('padding-top')
		target.style.removeProperty('padding-bottom')
		target.style.removeProperty('margin-bottom')
		target.style.removeProperty('margin-top')

		setTimeout(() => {
			target.style.removeProperty('height')
			target.style.removeProperty('overflow')
			target.style.removeProperty('transition-duration')
			target.style.removeProperty('transition-property')
			target.classList.remove('--sliding');
		}, duration);
	}
}
let slideUp = (target, duration = 500) => {
	if (!target.classList.contains('--sliding')) {
		target.classList.add('--sliding');
		let height = target.offsetHeight;

		target.style.transitionProperty = `height, margin, padding`;
		target.style.transitionDuration = `${duration}ms`;
		target.style.height = `${height}px`;

		target.offsetHeight;

		target.style.overflow = 'hidden';
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;

		target.style.height = 0;

		setTimeout(() => {
			target.style.removeProperty('padding-top')
			target.style.removeProperty('padding-bottom')
			target.style.removeProperty('margin-bottom')
			target.style.removeProperty('margin-top')

			target.style.removeProperty('height')
			target.style.removeProperty('overflow')
			target.style.removeProperty('transition-duration')
			target.style.removeProperty('transition-property')
			target.classList.remove('--sliding');

			target.hidden = true;
		}, duration);
	}
}
let slideToggle = (target, duration = 500) => {
	target.hidden ? slideDown(target, duration) : slideUp(target, duration)
}

// SLIDERS
const heroSlider = document.querySelector(`.hero`)

if (heroSlider) {
	new Swiper('.hero', {
		// Optional parameters
		loop: true,
		autoHeight: true,
		speed: 800,
		parallax: true,
		// If we need pagination
		pagination: {
			el: '.hero__pagination',
			clickable: true,
		},
		// Navigation arrows
		navigation: {
		  nextEl: '.hero__arrow--next',
		  prevEl: '.hero__arrow--prev',
		},
	});
}

const newSlider = document.querySelector(`.new`)

if (newSlider) {
	new Swiper('.new__slider', {
		// Optional parameters
		loop: true,
		autoHeight: true,
		speed: 800,
		slidesPerView: 4,
		spaceBetween: 38,
		breakpoints: {
			// when window width is >= 320px
			320: {
				slidesPerView: 1.5,
				spaceBetween: 15
			},
			480: {
				slidesPerView: 2,
				spaceBetween: 15
			},
			// when window width is >= 480px
			650: {
				slidesPerView: 3,
				spaceBetween: 25
			},
			// when window width is >= 640px
			991: {
				slidesPerView: 4,
				spaceBetween: 38
			}
		},
		// Navigation arrows
		navigation: {
		  nextEl: '.new__arrow--next',
		  prevEl: '.new__arrow--prev',
		},
	});
}

const feedbackSlider = document.querySelector(`.feedback`)

if (newSlider) {
	new Swiper('.feedback__slider', {
		// Optional parameters
		autoHeight: true,
		speed: 800,
		breakpoints: {
			320: {
				slidesPerView: 1.3,
				spaceBetween: 23
			},
			420: {
				slidesPerView: 1.5,
				spaceBetween: 23
			},
			628: {
				slidesPerView: 2,
				spaceBetween: 23
			},
			991: {
				slidesPerView: 3,
				spaceBetween: 23
			}
		},
		pagination: {
			el: '.feedback__pagination',
			clickable: true,
		}
	});
}

const productsSlider = document.querySelector(`.product`)

if (productsSlider) {
	const thumbSwiper = new Swiper(".thumb-slider", {
		loop: true,
		spaceBetween: 22,
		slidesPerView: 3,
		freeMode: true,
		watchSlidesProgress: true,
		direction: 'vertical',
	});

	const mainSwiper = new Swiper(".main-slider", {
		loop: true,
		spaceBetween: 10,
		navigation: {
			nextEl: ".thumb-slider-arrows__arrow--down",
			prevEl: ".thumb-slider-arrows__arrow--up",
		},
		thumbs: {
			swiper: thumbSwiper
		},
	});
	
}

// noUiSlider 

const filterRange = document.querySelector(`.price-section__range`)

if (filterRange) {
const filterRangeFrom = document.querySelector(`.price-section__input--from`)
const filterRangeTo = document.querySelector(`.price-section__input--to`)
	
	noUiSlider.create(filterRange, {
		start: [0, 100],
		connect: true,
		range: {
			'min': 0,
			'max': 100
		}, format: wNumb({
			decimals: 0,
			thousand: '',
			prefix: '$'
		})
	});

	filterRange.noUiSlider.on('update', function (values, handle) {
		filterRangeFrom.value = values[0]
		filterRangeTo.value = values[1]
	});

	filterRangeFrom.addEventListener('change', function () {
        filterRange.noUiSlider.setHandle(0, filterRangeFrom.value);
    });

	filterRangeTo.addEventListener('change', function () {
        filterRange.noUiSlider.setHandle(1, filterRangeTo.value);
    });
}

// Load Products from "backend"

const productItems = document.querySelector('.products__carts')

if (productItems) {
	loadProducts()
}

async function loadProducts () {
	const response = await fetch("json/products.json", {
		method: "GET"
	})
	if (response.ok) {
		const responseData = await response.json()
		initProducts(responseData)
	} else {
		alert('Error!')
	}
}

function initProducts(data) {
	const productsItems = data.products 
	if (productsItems.length) {
		let productTemplate = ``
		productsItems.forEach(productItem => {
			productTemplate += `<article class="item-product">`
			productTemplate += `<a href="#" class="item-product__favourite ${productItem.favourite ? 'item-product__favourite--active' : null} _icon-favourite"></a>`
			if (productItem.image) {
				productTemplate += `<a href="${productItem.url}" class="item-product__picture-link">`
				productTemplate += `<img src="${productItem.image}" alt="image-01" class="item-product__image">`
				productTemplate += `</a>`
			}
			productTemplate += `<div class="item-product__body">`
			productTemplate += `<h4 class="item-product__title">`
			productTemplate += `<a href="${productItem.url}" class="item-product__link-title">${productItem.title}</a>`
			productTemplate += `</h4>`
			productTemplate += `<div class="item-product__label">${productItem.label}</div>`
			productTemplate += `<div class="item-product__price">${productItem.price}</div>`
			productTemplate += `</div>`
			productTemplate += `</article>`
		})
		productItems.innerHTML = productTemplate
	}
}


// Tabs

function setTab(tabElement) {
	const tabsParent =  tabElement.closest('[data-tabs]')

	const tabsButton = Array.from(tabsParent.querySelectorAll('[data-tabs-button]'))
	const tabsActiveButton = tabsParent.querySelector('[data-tabs-button].active')
	
	tabsActiveButton.classList.remove('active')
	tabElement.classList.add('active')

	const currentButtonIndex = tabsButton.indexOf(tabElement)
	
	const tabsElements = tabsParent.querySelectorAll('[data-tabs-element]')

	tabsElements.forEach(tabsElement => {
		tabsElement.hidden = true
	})

	tabsElements[currentButtonIndex].hidden = false
}

// Delete element

function deleteElement(currentElement) {
	const productItem = document.querySelector('.body-details__item')
	if (productItem) {
		productItem.remove()
	}
}


// Quantity 

document.addEventListener("DOMContentLoaded", function () {
		// Функція для оновлення суми
		function updateTotal(cartItem) {
			const priceElement = cartItem.querySelector('[data-price]');
			const valueElement = cartItem.querySelector('[data-quantity-value]');
			const totalElement = cartItem.querySelector('[data-total]');
	
			if (!priceElement || !valueElement || !totalElement) return;
	
			// Видалення зайвих символів і обчислення
			const priceText = priceElement.textContent.trim().replace(/[^0-9.]/g, '');
			const price = parseFloat(priceText) || 0;
			const value = parseInt(valueElement.value) || 0;
			const total = value * price;
	
			// Оновлення загальної суми
			totalElement.textContent = `$${total.toFixed(2)}`;
		}
	
		// Обчислення суми при завантаженні сторінки
		document.querySelectorAll('[data-item]').forEach(updateTotal);
	
		// Обробка кліків для зміни кількості
		document.addEventListener("click", function (e) {
			const targetElement = e.target;
	
			if (targetElement.closest('[data-quantity-plus]') || targetElement.closest('[data-quantity-minus]')) {
				const quantityContainer = targetElement.closest('[data-quantity]');
				if (!quantityContainer) return;
	
				const valueElement = quantityContainer.querySelector('[data-quantity-value]');
				if (!valueElement) return;
	
				let value = parseInt(valueElement.value) || 0;
	
				if (targetElement.hasAttribute('data-quantity-plus')) {
					value++;
				}
	
				if (targetElement.hasAttribute('data-quantity-minus')) {
					value--;
					if (value < 1) value = 1; // Мінімальна кількість - 1
				}
	
				// Оновлення кількості
				valueElement.value = value;
	
				// Оновлення суми
				const cartItem = targetElement.closest('[data-item]');
				updateTotal(cartItem);
			}
		});
});


// Password

function showPassword(currentElement, input, showpassButton) {
	if (currentElement.classList.contains('payment__field')) {
		currentElement.classList.toggle('show-pass')

		if (currentElement.classList.contains('show-pass')) {
			input.setAttribute('type', 'text')
			showpassButton.setAttribute('class', 'payment__showpass _icon-eye-close')
		} 
		else {
			input.setAttribute('type', 'password')
			showpassButton.setAttribute('class', 'payment__showpass _icon-eye-light')
		}
	}

	if (currentElement.classList.contains('form-sign__wrapper') && currentElement.classList.contains('form-sign__wrapper--inside')){
		currentElement.classList.toggle('show-pass')

		if (currentElement.classList.contains('show-pass')) {
			input.setAttribute('type', 'text')
			showpassButton.setAttribute('class', 'form-sign__hide-pass _icon-eye-close')
		} 
		else {
			input.setAttribute('type', 'password')
			showpassButton.setAttribute('class', 'form-sign__hide-pass _icon-eye-dark')
		}
	} else if (currentElement.classList.contains('form-sign__wrapper')){	
		currentElement.classList.toggle('show-pass')

		if (currentElement.classList.contains('show-pass')) {
			input.setAttribute('type', 'text')
			showpassButton.setAttribute('class', 'form-sign__hide-pass _icon-eye-close')
			showpassButton.textContent = "Hide"
		} 
		else {
			input.setAttribute('type', 'password')
			showpassButton.setAttribute('class', 'form-sign__hide-pass _icon-eye-dark')
			showpassButton.textContent = "Show"
		}
	} 
}


// Show message about empty wishlist if there is nothing in Wishlist

(() => {
	// Вибір елементів
	const wishlistBlock = document.querySelector('.wishlist');
	const wishlistItems = document.querySelector('.wishlist__items');
	const fullWrapper = document.querySelector('[data-full-wrapper]');
	const emptyWrapper = document.querySelector('[data-empty-wrapper]');

	// Перевірка наявності необхідних елементів
	if (!wishlistBlock || !wishlistItems || !fullWrapper || !emptyWrapper) {
		console.log("Не всі елементи знайдені. Код для wishlist пропущено.");
		return; // Завершення виконання, якщо елементи не знайдені
	}

	// Функція оновлення стану
	function updateEmptyState() {
		const itemsCount = wishlistItems.children.length;
		console.log(`Кількість товарів: ${itemsCount}`);

		if (itemsCount === 0) {
			emptyWrapper.style.display = "block";
			fullWrapper.style.display = "none";
		} else {
			emptyWrapper.style.display = "none";
			fullWrapper.style.display = "block";
		}
	}

	// Налаштування MutationObserver
	const observer = new MutationObserver(() => {
		console.log("Зміна в контейнері знайдена.");
		updateEmptyState();
	});

	// Починаємо спостереження за списком товарів
	observer.observe(wishlistItems, { childList: true });

	// Початкова перевірка при завантаженні сторінки
	updateEmptyState();
})();












// Функція для парсингу медіа-запитів
function dataMediaQueries(array, dataSetValue) {
    const media = Array.from(array).filter(item => item.dataset[dataSetValue].split(",")[0]);
    if (media.length) {
        const breakpoints = [];
        media.forEach(item => {
            const params = item.dataset[dataSetValue].split(",");
            const breakpoint = {};
            breakpoint.value = params[0];
            breakpoint.type = params[1] ? params[1].trim() : "max";
            breakpoint.item = item;
            breakpoints.push(breakpoint);
        });
        let queries = breakpoints.map(item => {
            return `(${item.type}-width: ${item.value}px),${item.value},${item.type}`;
        });
        queries = [...new Set(queries)];
        const mdQueriesArray = [];
        queries.forEach(breakpoint => {
            const params = breakpoint.split(",");
            const mediaBreakpoint = {};
            mediaBreakpoint.matchMedia = window.matchMedia(params[0]);
            mediaBreakpoint.value = params[1];
            mediaBreakpoint.type = params[2];
            mediaBreakpoint.itemsArray = breakpoints.filter(item => {
                return item.value === mediaBreakpoint.value && item.type === mediaBreakpoint.type;
            });
            mdQueriesArray.push(mediaBreakpoint);
        });
        return mdQueriesArray;
    }
}

// Функція для роботи зі спойлерами
// Функція для згортання елемента
function _slideUp(target, duration = 500) {
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = `${duration}ms`;
    target.style.height = `${target.offsetHeight}px`;
    target.offsetHeight; // Примусове перерахування
    target.style.overflow = 'hidden';
    target.style.height = '0';
    target.style.paddingTop = '0';
    target.style.paddingBottom = '0';
    target.style.marginTop = '0';
    target.style.marginBottom = '0';
    window.setTimeout(() => {
        target.hidden = true;
        target.style.removeProperty('height');
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
    }, duration);
}

// Функція для розгортання елемента
function _slideDown(target, duration = 500) {
    target.hidden = target.hidden ? false : null;
    let height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = '0';
    target.style.paddingTop = '0';
    target.style.paddingBottom = '0';
    target.style.marginTop = '0';
    target.style.marginBottom = '0';
    target.offsetHeight; // Примусове перерахування
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = `${duration}ms`;
    target.style.height = `${height}px`;
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout(() => {
        target.style.removeProperty('height');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
    }, duration);
}

// Функція для перемикання (згортання/розгортання) елемента
function _slideToggle(target, duration = 500) {
    if (target.hidden) {
        return _slideDown(target, duration);
    } else {
        return _slideUp(target, duration);
    }
}

// Функція для спойлерів
function spollers() {
    const spollersArray = document.querySelectorAll('[data-spollers]');
    if (spollersArray.length > 0) {
        // Подія кліку
        document.addEventListener("click", setSpollerAction);
        // Отримання звичайних спойлерів
        const spollersRegular = Array.from(spollersArray).filter(function (item) {
            return !item.dataset.spollers.split(",")[0];
        });
        // Ініціалізація звичайних спойлерів
        if (spollersRegular.length) {
            initSpollers(spollersRegular);
        }
        // Отримання спойлерів з медіа-запитами
        const mdQueriesArray = dataMediaQueries(spollersArray, "spollers");
        if (mdQueriesArray && mdQueriesArray.length) {
            mdQueriesArray.forEach(mdQueriesItem => {
                mdQueriesItem.matchMedia.addEventListener("change", function () {
                    initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                });
                initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            });
        }
        // Ініціалізація
        function initSpollers(spollersArray, matchMedia = false) {
            spollersArray.forEach(spollersBlock => {
                spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
                if (matchMedia.matches || !matchMedia) {
                    spollersBlock.classList.add('_spoller-init');
                    initSpollerBody(spollersBlock);
                } else {
                    spollersBlock.classList.remove('_spoller-init');
                    initSpollerBody(spollersBlock, false);
                }
            });
        }
        // Робота з контентом
        function initSpollerBody(spollersBlock, hideSpollerBody = true) {
            const spollerItems = spollersBlock.querySelectorAll('details');
            if (spollerItems.length) {
                spollerItems.forEach(spollerItem => {
                    const spollerTitle = spollerItem.querySelector('summary');
                    if (hideSpollerBody) {
                        spollerTitle.removeAttribute('tabindex');
                        if (!spollerItem.hasAttribute('data-open')) {
                            spollerItem.open = false;
                            spollerTitle.nextElementSibling.hidden = true;
                        } else {
                            spollerTitle.classList.add('_spoller-active');
                            spollerItem.open = true;
                        }
                    } else {
                        spollerTitle.setAttribute('tabindex', '-1');
                        spollerTitle.classList.remove('_spoller-active');
                        spollerItem.open = true;
                        spollerTitle.nextElementSibling.hidden = false;
                    }
                });
            }
        }
        function setSpollerAction(e) {
            const el = e.target;
            if (el.closest('summary') && el.closest('[data-spollers]')) {
                e.preventDefault();
                const spollerTitle = el.closest('summary');
                const spollerBlock = spollerTitle.closest('details');
                const spollersBlock = spollerTitle.closest('[data-spollers]');
                const oneSpoller = spollersBlock.hasAttribute('data-one-spoller');
                const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                if (!spollersBlock.querySelectorAll('._slide').length) {
                    if (oneSpoller && !spollerBlock.open) {
                        hideSpollersBody(spollersBlock);
                    }

                    !spollerBlock.open ? spollerBlock.open = true : setTimeout(() => { spollerBlock.open = false }, spollerSpeed);

                    spollerTitle.classList.toggle('_spoller-active');
                    _slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
                }
            }
        }
        function hideSpollersBody(spollersBlock) {
            const spollerActiveBlock = spollersBlock.querySelector('details[open]');
            if (spollerActiveBlock && !spollersBlock.querySelectorAll('._slide').length) {
                const spollerActiveTitle = spollerActiveBlock.querySelector('summary');
                const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                spollerActiveTitle.classList.remove('_spoller-active');
                _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
                setTimeout(() => { spollerActiveBlock.open = false }, spollerSpeed);
            }
        }
    }
}

// Виклик функції після завантаження сторінки
document.addEventListener("DOMContentLoaded", spollers);
