// ====================================
// Wise MMDC Interactive Enhancements Group 13 
// Group Members:
// - John Paul P.
// - Reinard R.
// - JHAERSN  C.
// - Jubiler P.
// ====================================

// Wait po DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeInteractiveFeatures();
});

// Initialize all interactive features
function initializeInteractiveFeatures() {
  addWelcomeMessage();
  enhanceArticleCards();
  addScrollToTopButton();
  addNavigationHighlight();
  addFormInputValidation();
  addDynamicGreeting();
  addReadingProgress();
  addKeyboardShortcuts();
}

// ====================================
// Feature 1: Dynamic Welcome Message
// ====================================
function addWelcomeMessage() {
  const hero = document.querySelector('.hero__content');
  if (hero) {
    // Create a welcome notification para sa pinakauna
    const welcomeBox = document.createElement('div');
    welcomeBox.id = 'welcome-notification';
    welcomeBox.style.cssText = `
      background: rgba(249, 178, 51, 0.9);
      color: #333;
      padding: 15px 25px;
      border-radius: 8px;
      margin-top: 20px;
      font-weight: 600;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      animation: fadeInSlide 1s ease-out;
      cursor: pointer;
    `;
    
    const currentHour = new Date().getHours();
    let greeting = 'Hello';
    if (currentHour < 12) greeting = 'Good Morning';
    else if (currentHour < 18) greeting = 'Good Afternoon';
    else greeting = 'Good Evening';
    
    welcomeBox.innerHTML = `${greeting}! Welcome to Wise MMDC 🎓 <small>(Click to dismiss)</small>`;
    
    // Add click event sa dismiss button
    welcomeBox.addEventListener('click', function() {
      this.style.animation = 'fadeOut 0.5s ease-out';
      setTimeout(() => this.remove(), 500);
    });
    
    hero.appendChild(welcomeBox);
    
    // Auto-dismiss siya after 5 seconds 
    setTimeout(() => {
      if (welcomeBox.parentElement) {
        welcomeBox.style.animation = 'fadeOut 0.5s ease-out';
        setTimeout(() => welcomeBox.remove(), 500);
      }
    }, 5000);
  }
}

// ====================================
// Feature 2: Enhanced Article Cards
// ====================================
function enhanceArticleCards() {
  const articleCards = document.querySelectorAll('.article-card');
  
  articleCards.forEach((card, index) => {
    // Add entrance animation para sa pagpasok ng card
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease-out';
    
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 150);
    
    // Add interactive hover effect na may content preview
    card.addEventListener('mouseenter', function() {
      const excerpt = this.querySelector('.article-card__excerpt');
      if (excerpt) {
        excerpt.style.color = '#1B4F91';
        excerpt.style.transition = 'color 0.3s ease';
      }
    });
    
    card.addEventListener('mouseleave', function() {
      const excerpt = this.querySelector('.article-card__excerpt');
      if (excerpt) {
        excerpt.style.color = '#333';
      }
    });
    
    // Add click counter (para sa pagclick ng card)
    card.addEventListener('click', function(e) {
      if (!e.target.classList.contains('article-card__link')) {
        const link = this.querySelector('.article-card__link');
        if (link && link.href !== '#') {
          window.location.href = link.href;
        }
      }
    });
  });
}

// ====================================
// Feature 3: Scroll to Top Button
// ====================================
function addScrollToTopButton() {
  // Create button para sa pagscroll to top
  const scrollBtn = document.createElement('button');
  scrollBtn.id = 'scroll-to-top';
  scrollBtn.innerHTML = '↑';
  scrollBtn.setAttribute('aria-label', 'Scroll to top');
  scrollBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #1B4F91;
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    z-index: 1000;
  `;
  
  document.body.appendChild(scrollBtn);
  
  // Show/hide based on scroll position (para sa pagshow/hide ng button naman)
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollBtn.style.opacity = '1';
      scrollBtn.style.visibility = 'visible';
    } else {
      scrollBtn.style.opacity = '0';
      scrollBtn.style.visibility = 'hidden';
    }
  });
  
  // Smooth scroll to top
  scrollBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Hover effect
  scrollBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
    this.style.backgroundColor = '#143a6b';
  });
  
  scrollBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
    this.style.backgroundColor = '#1B4F91';
  });
}

// ====================================
// Feature 4: Active Navigation Highlight
// ====================================
function addNavigationHighlight() {
  const navLinks = document.querySelectorAll('.nav__link');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  navLinks.forEach(link => {
    // Update active state based on current page (para sa paghighlight ng active link)
    const linkPage = link.getAttribute('href');
    
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('nav__link--active');
    }
    
    // Add click effect para sa pagclick ng link
    link.addEventListener('click', function(e) {
      // Visual feedback
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 150);
    });
  });
}

// ====================================
// Feature 5: Form Input Validation (for future forms)
// ====================================
function addFormInputValidation() {
  const inputs = document.querySelectorAll('input[type="email"], input[type="text"]');
  
  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      validateInput(this);
    });
    
    input.addEventListener('focus', function() {
      clearValidation(this);
    });
  });
}

function validateInput(input) {
  const value = input.value.trim();
  
  if (input.type === 'email' && value !== '') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      showValidationMessage(input, 'Please enter a valid email address', false);
    } else {
      showValidationMessage(input, 'Valid email!', true);
    }
  }
}

function showValidationMessage(input, message, isValid) {
  clearValidation(input);
  
  const msg = document.createElement('span');
  msg.className = 'validation-message';
  msg.textContent = message;
  msg.style.cssText = `
    display: block;
    font-size: 0.85rem;
    margin-top: 5px;
    color: ${isValid ? '#28a745' : '#E31E24'};
    font-weight: 600;
  `;
  
  input.parentNode.appendChild(msg);
  
  if (!isValid) {
    input.style.borderColor = '#E31E24';
  } else {
    input.style.borderColor = '#28a745';
  }
}

function clearValidation(input) {
  const existingMsg = input.parentNode.querySelector('.validation-message');
  if (existingMsg) {
    existingMsg.remove();
  }
  input.style.borderColor = '';
}

// ====================================
// Feature 6: Dynamic Time-based Greeting (exciting greetings medyo confused ako dito sa una)
// ====================================
function addDynamicGreeting() {
  const heroTitle = document.querySelector('.hero__title');
  
  if (heroTitle) {
    const currentHour = new Date().getHours();
    let timeEmoji = '☀️';
    
    if (currentHour >= 0 && currentHour < 6) {
      timeEmoji = '🌙';
    } else if (currentHour >= 6 && currentHour < 12) {
      timeEmoji = '🌅';
    } else if (currentHour >= 12 && currentHour < 18) {
      timeEmoji = '☀️';
    } else {
      timeEmoji = '🌆';
    }
    
    // Add emoji without modifying original text
    const emojiSpan = document.createElement('span');
    emojiSpan.textContent = ' ' + timeEmoji;
    emojiSpan.style.animation = 'pulse 2s infinite';
    heroTitle.appendChild(emojiSpan);
  }
}

// ====================================
// Feature 7: Reading Progress Bar (challenged solved!)
// ====================================
function addReadingProgress() {
  const article = document.querySelector('.article');
  
  if (article) {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.id = 'reading-progress';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 4px;
      background: linear-gradient(to right, #1B4F91, #F9B233, #E31E24);
      z-index: 9999;
      transition: width 0.1s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    // Update progress on scroll
    window.addEventListener('scroll', function() {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.pageYOffset;
      const progress = (scrolled / documentHeight) * 100;
      
      progressBar.style.width = progress + '%';
    });
  }
}


// ====================================
// Feature 10: Dynamic Element Counter
// ====================================
function updateArticleCount() {
  const blogSection = document.querySelector('.blog');
  if (blogSection) {
    const articleCount = document.querySelectorAll('.article-card').length;
    const blogTitle = document.querySelector('.blog__title');
    
    if (blogTitle) {
      const countBadge = document.createElement('span');
      countBadge.style.cssText = `
        display: inline-block;
        background: #F9B233;
        color: #333;
        padding: 5px 15px;
        border-radius: 20px;
        font-size: 0.8em;
        margin-left: 15px;
        font-weight: 600;
      `;
      countBadge.textContent = `${articleCount} Article${articleCount !== 1 ? 's' : ''}`;
      blogTitle.appendChild(countBadge);
    }
  }
}

// Execute article count update
updateArticleCount();

// ====================================
// Feature 11: Smooth Scroll for Anchor Links
// ====================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// ====================================
// CSS Animations (injected via JavaScript)
// ====================================
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInSlide {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0.9);
    }
  }
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
  }
`;
document.head.appendChild(style);

// ====================================
// Console Welcome Message
// ====================================
console.log('%c🎓 Welcome to Wise MMDC!', 'font-size: 20px; font-weight: bold; color: #1B4F91;');
console.log('%cInteractive features loaded successfully!', 'font-size: 14px; color: #F9B233;');
console.log('This website helps Filipino students compare Traditional vs Online learning expenses.');

