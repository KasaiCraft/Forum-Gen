// Initialize Lucide icons
lucide.createIcons();

// Mobile menu toggle
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    
    navLinks.classList.toggle('mobile-active');
    
    // Update icon
    const icon = menuToggle.querySelector('i');
    if (navLinks.classList.contains('mobile-active')) {
        icon.setAttribute('data-lucide', 'x');
    } else {
        icon.setAttribute('data-lucide', 'menu');
    }
    lucide.createIcons();
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (navLinks.classList.contains('mobile-active') && 
        !nav.contains(e.target)) {
        navLinks.classList.remove('mobile-active');
        const icon = menuToggle.querySelector('i');
        icon.setAttribute('data-lucide', 'menu');
        lucide.createIcons();
    }
    
    // Existing modal close functionality
    if (e.target.classList.contains('modal')) {
        const modalId = e.target.id;
        closeModal(modalId);
    }
});

// Update mobile menu close behavior
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const navLinksContainer = document.querySelector('.nav-links');
            const menuToggle = document.querySelector('.mobile-menu-toggle');
            
            if (navLinksContainer.classList.contains('mobile-active')) {
                navLinksContainer.classList.remove('mobile-active');
                const icon = menuToggle.querySelector('i');
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            }
        });
    });
});

// Modal functions
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Re-create Lucide icons for any new elements in the modal
        lucide.createIcons();
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function switchModal(fromModalId, toModalId) {
    closeModal(fromModalId);
    setTimeout(() => showModal(toModalId), 100);
}

// Specific modal functions
function showLoginModal() {
    showModal('loginModal');
}

function showSignupModal() {
    showModal('signupModal');
}

function showDemoModal() {
    showModal('demoModal');
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        const modalId = e.target.id;
        closeModal(modalId);
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            closeModal(activeModal.id);
        }
    }
});

// Add scroll function
function scrollToBuilder() {
    const builderSection = document.getElementById('form-builder');
    if (builderSection) {
        const offsetTop = builderSection.offsetTop - 80; // Account for fixed nav
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            
            // Prevent default behavior for placeholder links (href="#")
            if (targetId === '#') {
                e.preventDefault();
                scrollToBuilder();
                return; 
            }

            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Form submissions
document.addEventListener('DOMContentLoaded', () => {
    const authForms = document.querySelectorAll('.auth-form');
    
    authForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            const inputs = form.querySelectorAll('input[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'var(--error-color)';
                } else {
                    input.style.borderColor = 'var(--border-color)';
                }
            });
            
            if (isValid) {
                // Simulate form submission
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Loading...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    alert('Account created successfully! Welcome to FormBuilder Pro.');
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    
                    // Close modal
                    const modal = form.closest('.modal');
                    if (modal) {
                        closeModal(modal.id);
                    }
                }, 1500);
            }
        });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = 'var(--shadow-sm)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.8)';
        nav.style.boxShadow = 'none';
    }
});

// Demo interactions
document.addEventListener('DOMContentLoaded', () => {
    const demoFields = document.querySelectorAll('.demo-field');
    const demoCanvas = document.querySelector('.demo-canvas');
    
    // Touch events for mobile
    demoFields.forEach(field => {
        let touchStartTime;
        let touchStartY;
        
        field.addEventListener('touchstart', (e) => {
            touchStartTime = Date.now();
            touchStartY = e.touches[0].clientY;
            field.style.transform = 'scale(0.95)';
        });
        
        field.addEventListener('touchend', (e) => {
            field.style.transform = '';
            const touchEndTime = Date.now();
            const touchDuration = touchEndTime - touchStartTime;
            
            // If it's a quick tap (less than 200ms), simulate adding a field
            if (touchDuration < 200) {
                e.preventDefault();
                addDemoField(field, demoCanvas);
            }
        });
        
        field.addEventListener('touchcancel', () => {
            field.style.transform = '';
        });
        
        // Existing drag functionality for desktop
        field.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', field.innerHTML);
            e.dataTransfer.setData('text/field-type', field.dataset.fieldType); // Pass field type
            field.style.opacity = '0.5';
        });
        
        field.addEventListener('dragend', () => {
            field.style.opacity = '1';
        });
    });
    
    // Helper function to add demo fields
    function addDemoField(sourceField, canvas) {
        if (!canvas) return;
        
        const fieldData = sourceField.innerHTML;
        const fieldType = sourceField.dataset.fieldType; // Get type from data attribute

        const newField = document.createElement('div');
        newField.style.animation = 'slideInUp 0.6s ease forwards';
        newField.classList.add('form-section'); // Add form-section to all draggable components
        newField.setAttribute('data-field-type', fieldType); // Set data-field-type for new field
        
        const uniqueId = `required-${Date.now()}`;

        // Common remove button structure
        const removeButtonHTML = `
            <button class="btn btn-sm btn-icon remove-field-btn"><i data-lucide="trash-2"></i></button>
        `;

        // Create field based on type
        if (fieldType === 'text') {
            newField.className = 'demo-form-field';
            newField.innerHTML = `
                <label>Text Input</label>
                <input type="text" placeholder="Enter text..." />
                <div class="field-settings">
                    <div class="required-checkbox-group">
                        <input type="checkbox" id="${uniqueId}" class="required-checkbox">
                        <label for="${uniqueId}">Required</label>
                    </div>
                    ${removeButtonHTML}
                </div>
            `;
        } else if (fieldType === 'email') {
            newField.className = 'demo-form-field';
            newField.innerHTML = `
                <label>Email address</label>
                <input type="email" placeholder="your@email.com" />
                <div class="field-settings">
                    <div class="required-checkbox-group">
                        <input type="checkbox" id="${uniqueId}" class="required-checkbox">
                        <label for="${uniqueId}">Required</label>
                    </div>
                    ${removeButtonHTML}
                </div>
            `;
        } else if (fieldType === 'dropdown') {
            newField.className = 'demo-form-field';
            newField.innerHTML = `
                <label>Dropdown</label>
                <select>
                    <option>Choose...</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                </select>
                <div class="field-settings">
                    <div class="required-checkbox-group">
                        <input type="checkbox" id="${uniqueId}" class="required-checkbox">
                        <label for="${uniqueId}">Required</label>
                    </div>
                    ${removeButtonHTML}
                </div>
            `;
        } else if (fieldType === 'file-upload') {
            newField.className = 'demo-form-field';
            newField.innerHTML = `
                <label>File Upload</label>
                <input type="file" />
                <div class="field-settings">
                    <div class="required-checkbox-group">
                        <input type="checkbox" id="${uniqueId}" class="required-checkbox">
                        <label for="${uniqueId}">Required</label>
                    </div>
                    ${removeButtonHTML}
                </div>
            `;
        } else if (fieldType === 'page-break') {
            newField.className = 'page-break-indicator';
            newField.innerHTML = `
                <i data-lucide="panels-top-left"></i>
                <span>--- Page Break ---</span>
                ${removeButtonHTML}
            `;
        } else if (fieldType === 'conditional-logic') {
            newField.className = 'conditional-logic-indicator';
            newField.innerHTML = `
                <i data-lucide="git-branch"></i>
                <span>Conditional Logic Applied Here</span>
                <p>Show/hide fields based on previous answers.</p>
                ${removeButtonHTML}
            `;
        } else if (fieldType === 'customize-design') {
            newField.className = 'customize-design-indicator';
            newField.innerHTML = `
                <i data-lucide="palette"></i>
                <span>Customize Design</span>
                <p>Change colors, fonts, and add your logo.</p>
                ${removeButtonHTML}
            `;
        } else if (fieldType === 'signature') {
            newField.className = 'signature-field';
            newField.innerHTML = `
                <label>Please sign below</label>
                <canvas id="signature-${uniqueId}" width="300" height="150" style="border: 1px solid var(--border-color); border-radius: var(--radius-md); cursor: crosshair;"></canvas>
                <button type="button" class="btn btn-secondary btn-sm" onclick="clearSignature('signature-${uniqueId}')">Clear</button>
                <button type="button" class="btn btn-primary btn-sm" onclick="saveSignature('signature-${uniqueId}')">Save Signature</button>
                ${removeButtonHTML}
            `;
            setTimeout(() => initSignatureCanvas(`signature-${uniqueId}`), 100);
        } else if (fieldType === 'calculated') {
            newField.className = 'calculated-field'; 
            newField.innerHTML = `
                <label>Calculated Field</label>
                <input type="number" id="quantity-${uniqueId}" placeholder="Quantity" style="margin-bottom: 0.5rem;">
                <input type="number" id="price-${uniqueId}" placeholder="Price per unit" style="margin-bottom: 0.5rem;">
                <input type="number" id="total-${uniqueId}" readonly placeholder="Auto-calculated total">
                ${removeButtonHTML}
            `;
            setTimeout(() => initCalculatedField(uniqueId), 100);
        } else if (fieldType === 'schedule') {
            newField.className = 'schedule-field';
            newField.innerHTML = `
                <label>Form Availability</label>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                    <div>
                        <label class="label-sm">Start Date</label>
                        <input type="datetime-local" id="start-${uniqueId}" value="${new Date().toISOString().slice(0, 16)}">
                    </div>
                    <div>
                        <label class="label-sm">End Date</label>
                        <input type="datetime-local" id="end-${uniqueId}" value="${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16)}">
                    </div>
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <input type="checkbox" id="enable-schedule-${uniqueId}" checked>
                    <label for="enable-schedule-${uniqueId}">Enable scheduling</label>
                </div>
                ${removeButtonHTML}
            `;
        } else if (fieldType === 'anti-spam') {
            newField.className = 'spam-protection-field';
            newField.innerHTML = `
                <label>Spam Protection</label>
                <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
                    <div>
                        <input type="checkbox" id="honeypot-${uniqueId}" checked>
                        <label for="honeypot-${uniqueId}">Enable honeypot field</label>
                    </div>
                    <div>
                        <input type="checkbox" id="time-check-${uniqueId}" checked>
                        <label for="time-check-${uniqueId}">Time-based validation</label>
                    </div>
                    <div>
                        <input type="checkbox" id="rate-limit-${uniqueId}">
                        <label for="${uniqueId}">Rate limiting</label>
                    </div>
                </div>
                <small style="color: var(--text-secondary); margin-top: 0.5rem;">
                    These protections work invisibly to prevent spam submissions
                </small>
                ${removeButtonHTML}
            `;
        } else if (fieldType === 'calculator') {
            newField.className = 'calculator-field';
            newField.innerHTML = `
                <label>Calculator</label>
                <div class="calculator-display">0</div>
                <div class="calculator-buttons">
                    <button type="button" class="calc-btn" data-value="7">7</button>
                    <button type="button" class="calc-btn" data-value="8">8</button>
                    <button type="button" class="calc-btn" data-value="9">9</button>
                    <button type="button" class="calc-btn operator" data-value="divide">÷</button>
                    <button type="button" class="calc-btn" data-value="4">4</button>
                    <button type="button" class="calc-btn" data-value="5">5</button>
                    <button type="button" class="calc-btn" data-value="6">6</button>
                    <button type="button" class="calc-btn operator" data-value="multiply">×</button>
                    <button type="button" class="calc-btn" data-value="1">1</button>
                    <button type="button" class="calc-btn" data-value="2">2</button>
                    <button type="button" class="calc-btn" data-value="3">3</button>
                    <button type="button" class="calc-btn operator" data-value="subtract">-</button>
                    <button type="button" class="calc-btn" data-value="0">0</button>
                    <button type="button" class="calc-btn" data-value=".">.</button>
                    <button type="button" class="calc-btn clear" data-value="clear">C</button>
                    <button type="button" class="calc-btn operator" data-value="add">+</button>
                    <button type="button" class="calc-btn equals" data-value="equals">=</button>
                </div>
                ${removeButtonHTML}
            `;
        } else if (fieldType === 'design') {
            newField.className = 'design-panel';
            newField.innerHTML = `
                <label>Custom Design Controls</label>
                <div class="design-controls">
                    <div>
                        <label>Field Color</label>
                        <input type="color" id="field-color" value="#2563eb">
                    </div>
                    <div>
                        <label>Font Size</label>
                        <select id="font-size">
                            <option value="14px">Small</option>
                            <option value="16px" selected>Medium</option>
                            <option value="18px">Large</option>
                        </select>
                    </div>
                    <div>
                        <label>Font Family</label>
                        <select id="font-family">
                            <option value="inherit" selected>Default</option>
                            <option value="Arial, sans-serif">Arial</option>
                            <option value="Georgia, serif">Georgia</option>
                            <option value="'Courier New', monospace">Monospace</option>
                        </select>
                    </div>
                    <div>
                        <label>Border Radius</label>
                        <select id="border-radius">
                            <option value="4px">Small</option>
                            <option value="8px" selected>Medium</option>
                            <option value="12px">Large</option>
                        </select>
                    </div>
                </div>
                <button type="button" class="btn btn-primary btn-sm" onclick="applyCustomStyles()">Apply to All Fields</button>
                ${removeButtonHTML}
            `;
        }
        
        canvas.appendChild(newField);
        attachFieldListeners(newField); // Try to attach listeners for auto-scroll if applicable
        updateProgressBar(); // Update progress bar after adding a new field
        lucide.createIcons(); // Re-render icons for new elements
        
        // Show feedback
        sourceField.style.transform = 'scale(1.1)';
        setTimeout(() => {
            sourceField.style.transform = '';
        }, 200);
    }
    
    // Existing desktop drag and drop
    if (demoCanvas) {
        demoCanvas.addEventListener('dragover', (e) => {
            e.preventDefault();
            demoCanvas.style.background = 'rgba(37, 99, 235, 0.05)';
        });
        
        demoCanvas.addEventListener('dragleave', () => {
            demoCanvas.style.background = '';
        });
        
        demoCanvas.addEventListener('drop', (e) => {
            e.preventDefault();
            demoCanvas.style.background = '';
            
            const fieldData = e.dataTransfer.getData('text/plain');
            const fieldType = e.dataTransfer.getData('text/field-type'); // Retrieve field type

            const sourceField = Array.from(demoFields).find(field => 
                field.innerHTML === fieldData && field.dataset.fieldType === fieldType
            );
            
            if (sourceField) {
                addDemoField(sourceField, demoCanvas);
            }
        });
    }
});

// Interactive demo button (now Publishing & Responses modal)
document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners for copy buttons inside the demoModal
    document.getElementById('demoModal').addEventListener('click', (e) => {
        if (e.target.classList.contains('copy-btn')) {
            const targetId = e.target.dataset.clipboardTarget;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.select();
                document.execCommand('copy');
                
                const originalText = e.target.textContent;
                e.target.textContent = 'Copied!';
                setTimeout(() => {
                    e.target.textContent = originalText;
                }, 1500);
            }
        }
    });
});

// Add some interactive elements to pricing cards
document.addEventListener('DOMContentLoaded', () => {
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = card.classList.contains('pricing-card-popular') 
                ? 'scale(1.05) translateY(-8px)' 
                : 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = card.classList.contains('pricing-card-popular') 
                ? 'scale(1.05)' 
                : '';
        });
    });
});

// Handle window resize for responsive adjustments
window.addEventListener('resize', () => {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768 && navLinks.classList.contains('mobile-active')) {
        navLinks.classList.remove('mobile-active');
        const icon = menuToggle.querySelector('i');
        icon.setAttribute('data-lucide', 'menu');
        lucide.createIcons();
    }
});

// Animate feature cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});

// Enhanced Calculator Field
function initCalculator(container) {
    const display = container.querySelector('.calculator-display');
    let currentInput = '0';
    let previousInput = null;
    let operation = null;
    let resetScreen = false;

    container.querySelectorAll('.calc-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const value = btn.dataset.value;
            
            if (value === 'clear') {
                currentInput = '0';
                previousInput = null;
                operation = null;
            } else if (value === 'backspace') {
                currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : '0';
            } else if (value === 'equals') {
                if (previousInput !== null && operation) {
                    currentInput = operate(previousInput, currentInput, operation);
                    previousInput = null;
                    operation = null;
                    resetScreen = true;
                }
            } else if (['add', 'subtract', 'multiply', 'divide'].includes(value)) {
                if (previousInput === null) {
                    previousInput = currentInput;
                } else if (operation) {
                    previousInput = operate(previousInput, currentInput, operation);
                }
                operation = value;
                resetScreen = true;
            } else {
                if (resetScreen || currentInput === '0') {
                    currentInput = value;
                    resetScreen = false;
                } else {
                    currentInput += value;
                }
            }
            
            display.textContent = currentInput;
        });
    });

    function operate(a, b, op) {
        const numA = parseFloat(a);
        const numB = parseFloat(b);
        
        switch (op) {
            case 'add': return (numA + numB).toString();
            case 'subtract': return (numA - numB).toString();
            case 'multiply': return (numA * numB).toString();
            case 'divide': return numB !== 0 ? (numA / numB).toString() : 'Error';
            default: return b;
        }
    }
}

// Custom Design Controls
function initDesignControls() {
    const colorPicker = document.getElementById('field-color');
    const fontSizeSelect = document.getElementById('font-size');
    const fontFamilySelect = document.getElementById('font-family');
    const borderRadiusSelect = document.getElementById('border-radius');
    
    function updateFieldStyles() {
        const fields = document.querySelectorAll('.form-field.custom-styled');
        fields.forEach(field => {
            if (colorPicker && colorPicker.value) {
                field.style.borderColor = colorPicker.value;
            }
            if (fontSizeSelect && fontSizeSelect.value) {
                field.style.fontSize = fontSizeSelect.value;
                const inputs = field.querySelectorAll('input, select, textarea');
                inputs.forEach(input => input.style.fontSize = fontSizeSelect.value);
            }
            if (fontFamilySelect && fontFamilySelect.value) {
                field.style.fontFamily = fontFamilySelect.value;
                const inputs = field.querySelectorAll('input, select, textarea');
                inputs.forEach(input => input.style.fontFamily = fontFamilySelect.value);
            }
            if (borderRadiusSelect && borderRadiusSelect.value) {
                field.style.borderRadius = borderRadiusSelect.value;
                const inputs = field.querySelectorAll('input, select, textarea');
                inputs.forEach(input => input.style.borderRadius = borderRadiusSelect.value);
            }
        });
    }
    
    if (colorPicker) colorPicker.addEventListener('input', updateFieldStyles);
    if (fontSizeSelect) fontSizeSelect.addEventListener('change', updateFieldStyles);
    if (fontFamilySelect) fontFamilySelect.addEventListener('change', updateFieldStyles);
    if (borderRadiusSelect) borderRadiusSelect.addEventListener('change', updateFieldStyles);
}

// Conditional Logic Implementation
function initConditionalLogic() {
    const addLogicBtn = document.querySelector('.add-logic-btn');
    const logicContainer = document.querySelector('.conditional-logic-builder');
    
    function evaluateConditions() {
        document.querySelectorAll('.logic-row').forEach(row => {
            const triggerField = row.querySelector('.trigger-field').value;
            const condition = row.querySelector('.trigger-condition').value;
            const value = row.querySelector('.trigger-value').value;
            const targetField = document.querySelector(`.${row.querySelector('.target-field').value}`);
            
            if (!targetField) return;
            
            const triggerElement = document.querySelector(`.${triggerField} input, .${triggerField} select`);
            if (!triggerElement) return;
            
            let isVisible = false;
            const triggerValue = triggerElement.value.toLowerCase();
            const compareValue = value.toLowerCase();
            
            switch (condition) {
                case 'equals':
                    isVisible = triggerValue === compareValue;
                    break;
                case 'not-equals':
                    isVisible = triggerValue !== compareValue;
                    break;
                case 'contains':
                    isVisible = triggerValue.includes(compareValue);
                    break;
                case 'not-contains':
                    isVisible = !triggerValue.includes(compareValue);
                    break;
                case 'empty':
                    isVisible = triggerValue === '';
                    break;
                case 'not-empty':
                    isVisible = triggerValue !== '';
                    break;
            }
            
            targetField.style.display = isVisible ? 'block' : 'none';
        });
    }
    
    function addLogicRow() {
        const row = document.createElement('div');
        row.className = 'logic-row';
        
        const fieldOptions = Array.from(document.querySelectorAll('.form-field'))
            .map((field, index) => `<option value="field-${index}">Field ${index + 1}</option>`)
            .join('');
        
        row.innerHTML = `
            <select class="trigger-field">
                ${fieldOptions}
            </select>
            <select class="trigger-condition">
                <option value="equals">Equals</option>
                <option value="not-equals">Not equals</option>
                <option value="contains">Contains</option>
                <option value="not-contains">Not contains</option>
                <option value="empty">Is empty</option>
                <option value="not-empty">Is not empty</option>
            </select>
            <input type="text" class="trigger-value" placeholder="Value">
            <select class="target-field">
                ${fieldOptions}
            </select>
            <button type="button" class="remove-logic">×</button>
        `;
        
        logicContainer.appendChild(row);
        
        row.querySelector('.remove-logic').addEventListener('click', () => {
            row.remove();
            evaluateConditions();
        });
        
        row.querySelectorAll('select, input').forEach(el => {
            el.addEventListener('change', evaluateConditions);
            el.addEventListener('input', evaluateConditions);
        });
    }
    
    if (addLogicBtn) {
        addLogicBtn.addEventListener('click', addLogicRow);
    }
    
    // Set up event listeners for all inputs
    document.addEventListener('input', evaluateConditions);
    document.addEventListener('change', evaluateConditions);
}

// Initialize new features
document.addEventListener('DOMContentLoaded', () => {
    // Initialize calculator if exists
    const calculatorFields = document.querySelectorAll('.calculator-field');
    calculatorFields.forEach(initCalculator);
    
    // Initialize design controls
    initDesignControls();
    
    // Initialize conditional logic
    initConditionalLogic();
});

// NEW: Signature Canvas Functions
function initSignatureCanvas(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    
    // Set canvas styling
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#000';
    
    // Mouse events
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    // Touch events for mobile
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        startDrawing({ 
            offsetX: touch.clientX - rect.left, 
            offsetY: touch.clientY - rect.top 
        });
    });
    
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        draw({ 
            offsetX: touch.clientX - rect.left, 
            offsetY: touch.clientY - rect.top 
        });
    });
    
    canvas.addEventListener('touchend', (e) => {
        e.preventDefault();
        stopDrawing();
    });
    
    function startDrawing(e) {
        isDrawing = true;
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
    }
    
    function draw(e) {
        if (!isDrawing) return;
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    }
    
    function stopDrawing() {
        if (isDrawing) {
            isDrawing = false;
            ctx.closePath();
        }
    }
}

function clearSignature(canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const signatureField = canvas.closest('.signature-field');
    if (signatureField) signatureField.dataset.signature = ''; // Clear stored signature
}

function saveSignature(canvasId) {
    const canvas = document.getElementById(canvasId);
    const dataURL = canvas.toDataURL('image/png');
    
    // Store signature data
    const signatureField = canvas.closest('.signature-field');
    if (signatureField) {
        signatureField.dataset.signature = dataURL;
        // Trigger auto-scroll if this field is part of a form section and has content
        scrollToNextFormSection(signatureField.closest('.form-section'));
    }
    
    // Visual feedback
    const saveBtn = signatureField.querySelector('.btn-primary');
    const originalText = saveBtn.textContent;
    saveBtn.textContent = 'Saved!';
    saveBtn.style.background = '#059669';
    setTimeout(() => {
        saveBtn.textContent = originalText;
        saveBtn.style.background = '';
    }, 1500);
}

// NEW: Calculated Fields
function initCalculatedField(uniqueId) {
    const quantityInput = document.getElementById(`quantity-${uniqueId}`);
    const priceInput = document.getElementById(`price-${uniqueId}`);
    const totalInput = document.getElementById(`total-${uniqueId}`);
    
    function calculate() {
        const quantity = parseFloat(quantityInput.value) || 0;
        const price = parseFloat(priceInput.value) || 0;
        const total = quantity * price;
        totalInput.value = total.toFixed(2);
    }
    
    if (quantityInput) quantityInput.addEventListener('input', calculate);
    if (priceInput) priceInput.addEventListener('input', calculate);
    
    // Initial calculation
    calculate();
}

// NEW: Real-time Collaboration (WebSocket simulation)
function initCollaboration() {
    // Simulate real-time cursor positions
    const cursor = document.createElement('div');
    cursor.className = 'collaboration-cursor';
    cursor.innerHTML = '<div class="cursor-dot"></div><div class="cursor-label">Alice</div>';
    
    // Simulate random cursor movements
    setInterval(() => {
        const canvas = document.querySelector('.demo-canvas');
        if (canvas && Math.random() > 0.8) {
            const rect = canvas.getBoundingClientRect();
            cursor.style.left = Math.random() * rect.width + 'px';
            cursor.style.top = Math.random() * rect.height + 'px';
            cursor.style.opacity = '1';
            
            if (!document.querySelector('.collaboration-cursor')) {
                canvas.appendChild(cursor);
            }
            
            setTimeout(() => {
                cursor.style.opacity = '0';
            }, 2000);
        }
    }, 3000);
}

// NEW: Auto-scroll to next section on field completion & Progress Bar
function attachFieldListeners(fieldElement) {
    // Auto-scroll logic for input fields
    const inputField = fieldElement.querySelector('input[type="text"], input[type="email"], input[type="file"], select');

    if (inputField) {
        inputField.addEventListener('input', () => {
            let isCompleted = false;
            if (inputField.type === 'file') {
                isCompleted = inputField.files.length > 0;
            } else {
                isCompleted = inputField.value.trim() !== '';
            }

            if (isCompleted) {
                scrollToNextFormSection(fieldElement);
            }
        });
    }

    // Auto-scroll logic for signature field (on Save) - handled in saveSignature
    // Calculated, Schedule, Anti-Spam, Page Break, Conditional Logic, Customize Design
    // do not trigger auto-scroll on user input, they are more informational/settings.
}

function scrollToNextFormSection(currentSection) {
    const demoCanvas = document.querySelector('.demo-canvas');
    if (!demoCanvas) return;

    const formSections = Array.from(demoCanvas.querySelectorAll('.form-section'));
    const currentIndex = formSections.indexOf(currentSection);

    if (currentIndex !== -1 && currentIndex < formSections.length - 1) {
        const nextSection = formSections[currentIndex + 1];
        nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function updateProgressBar() {
    const demoCanvas = document.querySelector('.demo-canvas');
    if (!demoCanvas) return;

    const formSections = Array.from(demoCanvas.querySelectorAll('.form-section'));
    const totalSections = formSections.length;

    const progressBarWrapper = document.querySelector('.progress-bar-wrapper');
    if (totalSections === 0) {
        if (progressBarWrapper) progressBarWrapper.style.display = 'none';
        return;
    } else {
        if (progressBarWrapper) progressBarWrapper.style.display = 'block';
    }

    let currentSectionIndex = 0;
    // Add a small buffer to ensure the section is considered "in view" when its top aligns with scroll top
    const scrollOffset = demoCanvas.scrollTop + 50; 

    for (let i = 0; i < totalSections; i++) {
        const section = formSections[i];
        if (section.offsetTop <= scrollOffset) {
            currentSectionIndex = i;
        } else {
            // Found the first section whose top is below the scrollOffset,
            // so the previous section is currently active.
            break; 
        }
    }
    
    const progressTextElement = document.querySelector('.progress-text');
    const progressFillElement = document.querySelector('.progress-fill');

    if (progressTextElement && progressFillElement) {
        progressTextElement.textContent = `Step ${currentSectionIndex + 1} of ${totalSections}`;
        const progressPercentage = (currentSectionIndex + 1) / totalSections * 100;
        progressFillElement.style.width = `${progressPercentage}%`;
    }
}

// Initialize collaboration simulation and progress bar
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initCollaboration, 2000);

    const demoCanvas = document.querySelector('.demo-canvas');
    if (demoCanvas) {
        // Attach scroll listener for progress bar updates
        demoCanvas.addEventListener('scroll', updateProgressBar);
        
        // Attach initial listeners for existing fields
        const initialFormSections = demoCanvas.querySelectorAll('.form-section');
        initialFormSections.forEach(section => {
            attachFieldListeners(section);
        });

        // Initial update of the progress bar
        updateProgressBar();
    }

    // NEW: Form Builder Controls (Zoom, Fullscreen, Grid)
    const formBuilderContainer = document.getElementById('form-builder-container');
    const zoomSlider = document.getElementById('zoom-slider');
    const zoomPresetButtons = document.querySelectorAll('.zoom-controls button[data-zoom-value]');
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const toggleGridBtn = document.getElementById('toggle-grid-btn');
    // demoCanvas is already defined above

    function applyBuilderStyles(scaleValue, isFullscreen = false) {
        if (!formBuilderContainer) return;

        let currentScale = parseFloat(scaleValue);

        // Apply/remove 'is-large' class based on scale for CSS class-based properties
        if (currentScale > 1.0) {
            formBuilderContainer.classList.add('is-large');
        } else {
            formBuilderContainer.classList.remove('is-large');
        }

        if (isFullscreen) {
            // Fullscreen specific styles (override CSS classes for a true fullscreen experience)
            formBuilderContainer.style.transform = `scale(1)`;
            formBuilderContainer.style.transformOrigin = 'center center';
            formBuilderContainer.style.width = '100%';
            formBuilderContainer.style.minHeight = '100vh';
            formBuilderContainer.style.overflow = 'auto'; // Allow scrolling within fullscreen
            formBuilderContainer.style.borderRadius = '0';
            formBuilderContainer.style.boxShadow = 'none';
        } else {
            // Reset inline styles to allow CSS classes and media queries to take effect
            formBuilderContainer.style.width = '';
            formBuilderContainer.style.minHeight = '';
            formBuilderContainer.style.overflow = '';
            formBuilderContainer.style.borderRadius = '';
            formBuilderContainer.style.boxShadow = '';
            formBuilderContainer.style.transformOrigin = ''; // Let CSS class or default handle it

            // Apply the actual scale and combined transforms
            // Default `transform` and `transform-origin` will come from CSS or `is-large` class
            formBuilderContainer.style.transform = `scale(${currentScale}) perspective(1000px) rotateX(5deg)`;
        }
    }

    // Set initial state: Compact (100%)
    if (zoomSlider) {
        zoomSlider.value = 1.0; 
    }
    applyBuilderStyles(1.0); // Apply initial compact styles

    // 1. Zoom Slider
    if (zoomSlider) {
        zoomSlider.addEventListener('input', (e) => {
            applyBuilderStyles(e.target.value);
        });
    }

    // 1. Preset Zoom Buttons
    zoomPresetButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const scale = e.target.dataset.zoomValue;
            if (zoomSlider) {
                zoomSlider.value = scale;
            }
            applyBuilderStyles(scale);
        });
    });

    // 3. Full-Screen Mode
    if (fullscreenBtn && formBuilderContainer) {
        fullscreenBtn.addEventListener('click', () => {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                formBuilderContainer.requestFullscreen().catch(e => {
                    alert("Fullscreen failed: " + e.message);
                    console.error("Fullscreen error:", e);
                });
            }
        });

        document.addEventListener('fullscreenchange', () => {
            if (!fullscreenBtn) return; // Safely exit if button element is somehow missing

            const textNode = fullscreenBtn.childNodes[0]; // Get the text node
            const icon = fullscreenBtn.querySelector('i'); // Get the <i> element

            if (textNode && icon) { // Ensure both exist for direct modification
                if (document.fullscreenElement) {
                    textNode.nodeValue = 'Exit Fullscreen '; 
                    icon.setAttribute('data-lucide', 'minimize');
                } else {
                    textNode.nodeValue = 'Full-Screen '; 
                    icon.setAttribute('data-lucide', 'maximize');
                }
                lucide.createIcons(); // Re-render icons to apply the change
            } else {
                // Fallback to innerHTML if textNode or icon is not found (e.g., initial render issue)
                // This might be the source of the problem if it runs repeatedly and creates issues with lucide.
                console.warn("Could not find text node or icon in fullscreen button for direct manipulation. Falling back to innerHTML.");
                if (document.fullscreenElement) {
                    fullscreenBtn.innerHTML = 'Exit Fullscreen <i data-lucide="minimize"></i>';
                } else {
                    fullscreenBtn.innerHTML = 'Full-Screen <i data-lucide="maximize"></i>';
                }
                lucide.createIcons();
            }
            // Apply styles after icon change, this was outside the conditional block
            applyBuilderStyles(document.fullscreenElement ? 1.0 : (zoomSlider ? zoomSlider.value : 1.0), document.fullscreenElement);
        });
    }

    // 5. Grid Overlay
    if (toggleGridBtn && demoCanvas) {
        toggleGridBtn.addEventListener('click', () => {
            if (!demoCanvas) return; // Add check for demoCanvas
            demoCanvas.classList.toggle('grid-overlay');
            const icon = toggleGridBtn.querySelector('i');
            if (icon) { // Add null check for icon
                if (demoCanvas.classList.contains('grid-overlay')) {
                    icon.setAttribute('data-lucide', 'square-dashed');
                } else {
                    icon.setAttribute('data-lucide', 'grid');
                }
            }
            lucide.createIcons();
        });
    }

    // NEW: Delete/Remove Option for Fields
    let lastDeletedField = null;
    let lastDeletedFieldNextSibling = null;

    document.addEventListener("click", (e) => {
        if (e.target.closest(".remove-field-btn")) {
            const fieldToRemove = e.target.closest(".form-section, .page-break-indicator, .conditional-logic-indicator, .customize-design-indicator, .signature-field, .calculated-field, .schedule-field, .spam-protection-field");
            
            if (fieldToRemove) {
                lastDeletedField = fieldToRemove;
                lastDeletedFieldNextSibling = fieldToRemove.nextElementSibling; // Store sibling for re-insertion
                fieldToRemove.remove();
                updateProgressBar(); // Update progress bar after removal
                showUndoToast(lastDeletedField, lastDeletedFieldNextSibling);
            }
        }
    });

    document.addEventListener("mouseover", (e) => {
        if (e.target.closest(".remove-field-btn")) {
            const field = e.target.closest(".form-section, .page-break-indicator, .conditional-logic-indicator, .customize-design-indicator, .signature-field, .calculated-field, .schedule-field, .spam-protection-field");
            if (field) {
                field.classList.add("highlight-for-deletion");
            }
        }
    });

    document.addEventListener("mouseout", (e) => {
        if (e.target.closest(".remove-field-btn")) {
            const field = e.target.closest(".form-section, .page-break-indicator, .conditional-logic-indicator, .customize-design-indicator, .signature-field, .calculated-field, .schedule-field, .spam-protection-field");
            if (field) {
                field.classList.remove("highlight-for-deletion");
            }
        }
    });

    function showUndoToast(deletedField, nextSibling) {
        Toastify({ 
            text: "Field deleted. ",
            duration: 5000,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            className: "info",
            style: {
                background: "linear-gradient(to right, #00b09b, #28a745)",
            },
            onClick: function(){ // Callback after click
                if (deletedField && deletedField.parentNode === null) { // Check if it's actually removed
                    const parent = document.querySelector('.demo-canvas');
                    if (parent) {
                        if (nextSibling && nextSibling.parentNode === parent) {
                            parent.insertBefore(deletedField, nextSibling);
                        } else {
                            parent.appendChild(deletedField); // Re-add at the end if sibling is gone
                        }
                        updateProgressBar(); // Update progress bar after undo
                        lucide.createIcons(); // Re-render icons for the restored field
                        deletedField = null; // Clear reference
                        nextSibling = null;
                    }
                }
                this.hideToast(); // Hide the toast immediately after undo button is clicked
            }
        }).showToast();
    }

    // NEW: Export Options
    const exportPdfBtn = document.getElementById("export-pdf");

    function downloadFile(filename, data, type) {
        const blob = new Blob([data], { type: type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    if (exportPdfBtn) {
        exportPdfBtn.addEventListener("click", async () => {
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF("p", "mm", "a4");

            // Title
            pdf.setFont("helvetica", "bold");
            pdf.setTextColor(40, 40, 40);
            pdf.setFontSize(18);
            pdf.text("Your Form Export", 15, 20);

            const demoCanvas = document.querySelector(".demo-canvas");
            const fields = demoCanvas ? demoCanvas.querySelectorAll(".demo-form-field, .page-break-indicator, .conditional-logic-indicator, .customize-design-indicator, .signature-field, .calculated-field, .schedule-field, .spam-protection-field") : [];

            let yPosition = 30;

            fields.forEach((field) => {
                if (yPosition > 250) {
                    pdf.addPage();
                    yPosition = 20;
                }

                if (field.classList.contains("demo-form-field")) {
                    const label = field.querySelector("label")?.innerText || "Field";
                    const input = field.querySelector("input, select");
                    let type = input?.type || "text";

                    pdf.setFontSize(12);
                    pdf.setFont("helvetica", "normal");
                    pdf.text(`${label} (${type})`, 15, yPosition);

                    // Visual representation
                    pdf.setDrawColor(100, 100, 100);
                    if (type === "text" || type === "email" || type === "number") {
                        pdf.line(15, yPosition + 2, 100, yPosition + 2);
                    } else if (type === "select-one") {
                        pdf.line(15, yPosition + 2, 60, yPosition + 2);
                        pdf.text("▼", 62, yPosition + 1);
                    }
                    yPosition += 10;
                } else if (field.classList.contains("page-break-indicator")) {
                    pdf.setFont("helvetica", "italic");
                    pdf.text("--- Page Break ---", 15, yPosition);
                    yPosition += 10;
                } else if (field.classList.contains("conditional-logic-indicator")) {
                    pdf.setFont("helvetica", "normal");
                    pdf.text("Conditional Logic Applied", 15, yPosition);
                    yPosition += 10;
                } else if (field.classList.contains("customize-design-indicator")) {
                    pdf.setFont("helvetica", "normal");
                    pdf.text("Custom Design Section", 15, yPosition);
                    yPosition += 10;
                } else if (field.classList.contains("signature-field")) {
                    pdf.setFont("helvetica", "normal");
                    pdf.text("Signature Field:", 15, yPosition); // Changed label for clarity
                    
                    const signatureDataURL = field.dataset.signature; // Retrieve saved signature
                    if (signatureDataURL) {
                        // Add the signature image (scaled to 60mm width, 30mm height for PDF)
                        pdf.addImage(signatureDataURL, 'PNG', 15, yPosition + 5, 60, 30); 
                        yPosition += 40; // Adjust Y position after image
                    } else {
                        // If no signature, show a placeholder box
                        pdf.setDrawColor(100, 100, 100);
                        pdf.rect(15, yPosition + 5, 60, 30); // Draw a placeholder rectangle
                        pdf.setFontSize(8);
                        pdf.setTextColor(150, 150, 150);
                        pdf.text("(No signature provided)", 18, yPosition + 20); // Placeholder text
                        pdf.setTextColor(40, 40, 40); // Reset color
                        yPosition += 40;
                    }
                } else if (field.classList.contains("calculated-field")) {
                    pdf.setFont("helvetica", "normal");
                    pdf.text("Calculated Field", 15, yPosition);
                    yPosition += 10;
                } else if (field.classList.contains("schedule-field")) {
                    pdf.setFont("helvetica", "normal");
                    pdf.text("Form Schedule", 15, yPosition);
                    yPosition += 10;
                } else if (field.classList.contains("spam-protection-field")) {
                    pdf.setFont("helvetica", "normal");
                    pdf.text("Spam Protection", 15, yPosition);
                    yPosition += 10;
                }
            });

            pdf.save("structured-form-export.pdf");
            Toastify({
                text: "Form exported as PDF!",
                duration: 3000,
                gravity: "bottom",
                position: "right",
                style: { background: "linear-gradient(to right, #00b09b, #28a745)" }
            }).showToast();
        });
    }
});