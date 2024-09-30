
const toggleBtn = document.querySelector('.toggle-btn');
const carouselContainer = document.querySelector('.carousel-container');
const mainProject = document.getElementById('main-project');
const columnProjects = document.getElementById('column-projects');
const gridView = document.getElementById('grid-view');
const allProjects = [
    {
        src: 'https://via.placeholder.com/600x400?text=Project+1',
        alt: 'Project 1',
        gallery: [
            'https://via.placeholder.com/800x600?text=Project+1+Image+1',
            'https://via.placeholder.com/800x600?text=Project+1+Image+2',
            'https://via.placeholder.com/800x600?text=Project+1+Image+3'
        ],
        stats: [
            { label: 'Clients', value: '10+' },
            { label: 'Projects', value: '25+' },
            { label: 'Awards', value: '5' }
        ],
        description: 'Project 1 is a web development project that involved creating a responsive and interactive website for a local business. The project focused on enhancing user experience and improving site performance.'
    },
    {
        src: 'https://via.placeholder.com/600x400?text=Project+2',
        alt: 'Project 2',
        gallery: [
            'https://via.placeholder.com/800x600?text=Project+2+Image+1',
            'https://via.placeholder.com/800x600?text=Project+2+Image+2'
        ],
        stats: [
            { label: 'Clients', value: '5+' },
            { label: 'Projects', value: '15+' },
            { label: 'Awards', value: '2' }
        ],
        description: 'Project 2 was a mobile app development project aimed at improving productivity for remote teams. It included features such as task management, real-time collaboration, and progress tracking.'
    },
    // Add similar objects for Project 3 to 7
    {
        src: 'https://via.placeholder.com/600x400?text=Project+3',
        alt: 'Project 3',
        gallery: [
            'https://via.placeholder.com/800x600?text=Project+3+Image+1',
            'https://via.placeholder.com/800x600?text=Project+3+Image+2',
            'https://via.placeholder.com/800x600?text=Project+3+Image+3'
        ],
        stats: [
            { label: 'Clients', value: '8+' },
            { label: 'Projects', value: '20+' },
            { label: 'Awards', value: '3' }
        ],
        description: 'Project 3 focused on e-commerce solutions, developing a platform that streamlined online transactions and enhanced customer engagement through personalized recommendations.'
    },
    {
        src: 'https://via.placeholder.com/600x400?text=Project+4',
        alt: 'Project 4',
        gallery: [
            'https://via.placeholder.com/800x600?text=Project+4+Image+1',
            'https://via.placeholder.com/800x600?text=Project+4+Image+2'
        ],
        stats: [
            { label: 'Clients', value: '12+' },
            { label: 'Projects', value: '30+' },
            { label: 'Awards', value: '4' }
        ],
        description: 'Project 4 was a branding initiative that included logo design, brand strategy, and the development of marketing materials to strengthen the company’s market presence.'
    },
    {
        src: 'https://via.placeholder.com/600x400?text=Project+5',
        alt: 'Project 5',
        gallery: [
            'https://via.placeholder.com/800x600?text=Project+5+Image+1',
            'https://via.placeholder.com/800x600?text=Project+5+Image+2',
            'https://via.placeholder.com/800x600?text=Project+5+Image+3'
        ],
        stats: [
            { label: 'Clients', value: '7+' },
            { label: 'Projects', value: '18+' },
            { label: 'Awards', value: '1' }
        ],
        description: 'Project 5 involved developing a custom CMS for a media company, enabling efficient content management and seamless integration with various digital platforms.'
    },
    {
        src: 'https://via.placeholder.com/600x400?text=Project+6',
        alt: 'Project 6',
        gallery: [
            'https://via.placeholder.com/800x600?text=Project+6+Image+1',
            'https://via.placeholder.com/800x600?text=Project+6+Image+2'
        ],
        stats: [
            { label: 'Clients', value: '9+' },
            { label: 'Projects', value: '22+' },
            { label: 'Awards', value: '2' }
        ],
        description: 'Project 6 was a UI/UX design project aimed at enhancing user interactions and improving the overall aesthetic of a fintech application.'
    },
    {
        src: 'https://via.placeholder.com/600x400?text=Project+7',
        alt: 'Project 7',
        gallery: [
            'https://via.placeholder.com/800x600?text=Project+7+Image+1',
            'https://via.placeholder.com/800x600?text=Project+7+Image+2',
            'https://via.placeholder.com/800x600?text=Project+7+Image+3'
        ],
        stats: [
            { label: 'Clients', value: '6+' },
            { label: 'Projects', value: '19+' },
            { label: 'Awards', value: '3' }
        ],
        description: 'Project 7 focused on developing a sustainable energy solution platform, integrating various renewable energy sources and providing real-time analytics to users.'
    }
];
let currentIndex = 0;
let isGrid = false;
let isAnimating = false;

// Modal Elements
const modal = document.getElementById('project-modal');
const closeBtn = document.querySelector('.close-btn');
const galleryImages = document.getElementById('gallery-images');
const prevImageBtn = document.getElementById('prev-image');
const nextImageBtn = document.getElementById('next-image');
const statsDiv = document.getElementById('stats');
const descriptionDiv = document.getElementById('description');
let galleryCurrentIndex = 0;

// Initialize Main Project
function updateMainProject(index) {
    isAnimating = true;
    mainProject.style.opacity = 0;
    mainProject.style.transform = 'scale(0.8)';
    setTimeout(() => {
        mainProject.innerHTML = `<img src="${allProjects[index].src}" alt="${allProjects[index].alt}">`;
        mainProject.style.transform = 'scale(1)';
        mainProject.style.opacity = 1;
        isAnimating = false;
    }, 300);
}

// Initialize Column Projects
function updateColumnProjects() {
    const column = Array.from(columnProjects.children);
    column.forEach((project, idx) => {
        const projectIndex = (currentIndex + idx + 1) % allProjects.length;
        project.querySelector('img').src = allProjects[projectIndex].src;
        project.querySelector('img').alt = allProjects[projectIndex].alt;
        project.classList.remove('active');
        project.style.opacity = 0.6;
        project.style.filter = 'blur(2px)';
        project.style.transform = 'scale(0.8)';
    });
}

// Initial Load
updateMainProject(currentIndex);
updateColumnProjects();

// Toggle Button Functionality
toggleBtn.addEventListener('click', () => {
    isGrid = !isGrid;
    if (isGrid) {
        carouselContainer.style.display = 'none';
        gridView.style.display = 'flex';
        toggleBtn.textContent = 'Carousel View';
    } else {
        carouselContainer.style.display = 'flex';
        gridView.style.display = 'none';
        toggleBtn.textContent = 'Grid View';
    }
});

// Handle Scroll Events for Carousel Navigation
window.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (isAnimating) return;
    if (e.deltaY > 0) {
        navigateNext();
    } else {
        navigatePrev();
    }
}, { passive: false });

// Handle Touch Events for Mobile
let touchStartY = 0;
window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
});

window.addEventListener('touchend', (e) => {
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchEndY - touchStartY;
    if (deltaY > 50) {
        navigatePrev();
    } else if (deltaY < -50) {
        navigateNext();
    }
});

// Handle Click Events on Column Projects
const columnProjectElements = document.querySelectorAll('.column-project');
columnProjectElements.forEach(project => {
    project.addEventListener('click', () => {
        const index = parseInt(project.getAttribute('data-index'));
        if (index !== currentIndex && !isAnimating) {
            navigateTo(index);
        }
    });
});
// Select all grid view projects
const gridProjectElements = document.querySelectorAll('.grid .project');

// Add click event listeners to each grid project
// gridProjectElements.forEach(project => {
//     project.addEventListener('click', () => {
//         const index = parseInt(project.getAttribute('data-index'));
//         if (index !== currentIndex && !isAnimating) {
//             navigateTo(index);
//             openModal(index); // Open modal with the selected project
//         } else if (index === currentIndex && !isAnimating) {
//             openModal(index); // Open modal even if it's the current project
//         }
//     });
// });
gridProjectElements.forEach(project => {
    project.addEventListener('click', () => {
        const index = parseInt(project.getAttribute('data-index'));
        console.log(`Grid project clicked: Index ${index}`);
        if (index !== currentIndex && !isAnimating) {
            navigateTo(index);
            openModal(index);
        } else if (index === currentIndex && !isAnimating) {
            openModal(index);
        }
    });
});

// Handle Arrow Keys for Navigation
window.addEventListener('keydown', (e) => {
    if (isGrid) return; // Do not navigate carousel when grid is active
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        navigateNext();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        navigatePrev();
    }
});

// Navigation Functions
function navigateNext() {
    isAnimating = true;
    currentIndex = (currentIndex + 1) % allProjects.length;
    updateMainProject(currentIndex);
    updateColumnProjects();
    setTimeout(() => {
        isAnimating = false;
    }, 600); // Match with CSS transition duration
}

function navigatePrev() {
    isAnimating = true;
    currentIndex = (currentIndex - 1 + allProjects.length) % allProjects.length;
    updateMainProject(currentIndex);
    updateColumnProjects();
    setTimeout(() => {
        isAnimating = false;
    }, 600); // Match with CSS transition duration
}

function navigateTo(index) {
    isAnimating = true;
    currentIndex = index;
    updateMainProject(currentIndex);
    updateColumnProjects();
    setTimeout(() => {
        isAnimating = false;
    }, 600); // Match with CSS transition duration
}


// Handle Click on Main Project to Open Modal
mainProject.addEventListener('click', () => {
    if (!isGrid && !isAnimating) {
        openModal(currentIndex);
    }
});

// Modal Functionality
// Function to open modal with specific project index
function openModal(index) {
    const project = allProjects[index];
    if (!project) return; // Safety check

    // Populate Image Gallery
    galleryImages.innerHTML = '';
    project.gallery.forEach(imgSrc => {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = project.alt;
        img.classList.add('gallery-image');
        galleryImages.appendChild(img);
    });
    galleryCurrentIndex = 0;
    updateGallery();

    // Populate Statistics
    statsDiv.innerHTML = '';
    project.stats.forEach(stat => {
        const statDiv = document.createElement('div');
        statDiv.classList.add('stat');
        statDiv.innerHTML = `<strong>${stat.label}:</strong> ${stat.value}`;
        statsDiv.appendChild(statDiv);
    });

    // Populate Description
    descriptionDiv.innerHTML = `<p>${project.description}</p>`;

    // Show Modal
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
}
// Add keyboard navigation for image gallery when modal is open
window.addEventListener('keydown', (e) => {
    if (modal.style.display === 'flex') {
        if (e.key === 'ArrowLeft') {
            // Navigate to previous image
            if (galleryCurrentIndex > 0) {
                galleryCurrentIndex--;
                updateGallery();
            }
        } else if (e.key === 'ArrowRight') {
            // Navigate to next image
            if (galleryCurrentIndex < allProjects[currentIndex].gallery.length - 1) {
                galleryCurrentIndex++;
                updateGallery();
            }
        } else if (e.key === 'Escape') {
            // Close modal on Escape key
            closeModal();
        }
    }
});

// Close Modal Functionality
closeBtn.addEventListener('click', () => {
    closeModal();
});

// Close Modal When Clicking Outside Content
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

function closeModal() {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
}

// Image Gallery Navigation
prevImageBtn.addEventListener('click', () => {
    if (galleryCurrentIndex > 0) {
        galleryCurrentIndex--;
        updateGallery();
    }
});

nextImageBtn.addEventListener('click', () => {
    if (galleryCurrentIndex < allProjects[currentIndex].gallery.length - 1) {
        galleryCurrentIndex++;
        updateGallery();
    }
});

function updateGallery() {
    const translateX = -galleryCurrentIndex * 100;
    galleryImages.style.transform = `translateX(${translateX}%)`;
}

// Handle Swipe Gestures for Image Gallery
let touchStartX = 0;
window.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
});

window.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX;
    if (deltaX > 50) {
        // Swipe Right
        if (galleryCurrentIndex > 0) {
            galleryCurrentIndex--;
            updateGallery();
        }
    } else if (deltaX < -50) {
        // Swipe Left
        if (galleryCurrentIndex < allProjects[currentIndex].gallery.length - 1) {
            galleryCurrentIndex++;
            updateGallery();
        }
    }
});

