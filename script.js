document.addEventListener('DOMContentLoaded', () => {
    
    // VARIABLES
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const termsLink = document.getElementById('termsLink');
    const userNameDisplay = document.getElementById('userNameDisplay');
    const powerbankGrid = document.getElementById('powerbankGrid');
    
    // MODAL VARIABLES
    const qrModal = document.getElementById('qrModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modalSubtitle = document.getElementById('modalSubtitle');

    // 1. TERMS AND CONDITIONS ALERT
    if (termsLink) {
        termsLink.addEventListener('click', (e) => {
            e.preventDefault();
            alert("BATTFEERY TERMS & CONDITIONS:\n\n1. Penalty is ₱10 every 30 minutes for late returns.\n2. Lost or damaged power banks will incur additional penalty fees.\n3. Do not bring the power bank outside the MCU campus.");
        });
    }

    // 2. SIGN UP SUBMIT (Ise-save ang account sa browser)
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(signupForm);
            
            // Kunin ang mga nilagay sa form
            const fullName = formData.get('fullName');
            const email = formData.get('schoolEmail');
            const password = formData.get('password');
            const firstName = fullName.split(' ')[0]; 
            
            // I-save ang Email at Password para sa mock login validation
            localStorage.setItem('battfeery_email', email);
            localStorage.setItem('battfeery_pass', password);
            localStorage.setItem('battfeery_user', firstName);
            
            alert('Account created successfully! Pwede ka na mag-log in.');
            window.location.href = 'login.html'; // Pabalikin sa login page matapos mag-sign up
        });
    }

    // 3. LOGIN SUBMIT (Iche-check kung tama ang password)
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Kunin ang tinype na email at password sa login
            const loginId = document.getElementById('loginId').value;
            const loginPassword = document.getElementById('loginPassword').value;
            
            // Kunin ang nai-save na email at password noong nag-sign up
            const savedEmail = localStorage.getItem('battfeery_email');
            const savedPass = localStorage.getItem('battfeery_pass');

            // I-check kung nagma-match
            if (loginId === savedEmail && loginPassword === savedPass) {
                // TAMA ANG PASSWORD - Papasukin sa dashboard
                window.location.href = 'dashboard.html';
            } else {
                // MALI ANG PASSWORD O EMAIL
                alert('Access Denied: Mali ang iyong Email o Password. Subukan ulit.');
            }
        });
    }

    // 4. DASHBOARD LOGIC 
    if (powerbankGrid) {
        const savedName = localStorage.getItem('battfeery_user') || 'Centralino';
        userNameDisplay.textContent = savedName;

        const powerbanks = [
            { id: 'PB-01', status: 'Available' },
            { id: 'PB-02', status: 'In Use' },
            { id: 'PB-03', status: 'Available' },
            { id: 'PB-04', status: 'In Use' },
            { id: 'PB-05', status: 'Available' },
            { id: 'PB-06', status: 'Available' },
            { id: 'PB-07', status: 'Available' },
            { id: 'PB-08', status: 'In Use' },
            { id: 'PB-09', status: 'Available' },
            { id: 'PB-10', status: 'In Use' },
            { id: 'PB-11', status: 'Available' },
            { id: 'PB-12', status: 'In Use' },
            { id: 'PB-13', status: 'Available' },
            { id: 'PB-14', status: 'In Use' },
            { id: 'PB-15', status: 'Available' },
            { id: 'PB-16', status: 'Available' },
            { id: 'PB-17', status: 'In Use' },
            { id: 'PB-18', status: 'In Use' },
            { id: 'PB-19', status: 'Available' },
            { id: 'PB-20', status: 'In Use' },
            { id: 'PB-21', status: 'Available' },
            { id: 'PB-22', status: 'In Use' },
            { id: 'PB-23', status: 'In Use' },
            { id: 'PB-24', status: 'In Use' },
        ];

        powerbanks.forEach(pb => {
            const card = document.createElement('div');
            const isAvailable = pb.status === 'Available';
            card.className = `pb-card ${isAvailable ? 'pb-available' : 'pb-unavailable'}`;
            card.innerHTML = `
                <h3>${pb.id}</h3>
                <span class="status">${pb.status}</span>
                <p style="margin-top: 5px; font-size: 12px; color: #666;">
                    ${isAvailable ? 'Click to rent' : 'Currently rented'}
                </p>
            `;
            if (isAvailable) {
                card.addEventListener('click', () => {
                    modalSubtitle.textContent = `Power Bank: ${pb.id}`;
                    qrModal.style.display = 'flex';
                });
            }
            powerbankGrid.appendChild(card);
        });
    }

    // 5. CLOSE MODAL LOGIC
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => { qrModal.style.display = 'none'; });
        window.addEventListener('click', (e) => {
            if (e.target === qrModal) qrModal.style.display = 'none';
        });
    }
});