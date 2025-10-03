document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');

    let currentSlide = 0;
    const slideInterval = 5000; // Ganti slide setiap 5 detik (5000 milidetik)

    function showSlide(index) {
        // Sembunyikan semua slide
        slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // Tampilkan slide yang dipilih
        slides[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length; // Pindah ke slide berikutnya, kembali ke 0 jika sudah di akhir
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length; // Pindah ke slide sebelumnya
        showSlide(currentSlide);
    }

    // Event listener untuk tombol
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval(); // Reset timer saat tombol diklik
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval(); // Reset timer saat tombol diklik
    });

    // Mulai putaran otomatis
    let autoPlay = setInterval(nextSlide, slideInterval);

    // Fungsi untuk mereset interval otomatis
    function resetInterval() {
        clearInterval(autoPlay);
        autoPlay = setInterval(nextSlide, slideInterval);
    }

    // Tampilkan slide pertama saat halaman dimuat
    showSlide(currentSlide);
});

// Confetti animation
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
let confetti = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function randomColor() {
    const colors = ['#f8b500', '#ff8c8c', '#8cc6ff', '#baffc9', '#fffbe7'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function createConfettiPiece() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * -canvas.height,
        r: Math.random() * 6 + 4,
        d: Math.random() * 40 + 10,
        color: randomColor(),
        tilt: Math.random() * 10 - 10,
        tiltAngle: 0,
        tiltAngleIncremental: (Math.random() * 0.07) + 0.05
    };
}

function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach(c => {
        ctx.beginPath();
        ctx.lineWidth = c.r;
        ctx.strokeStyle = c.color;
        ctx.moveTo(c.x + c.tilt + (c.r / 3), c.y);
        ctx.lineTo(c.x + c.tilt, c.y + c.d);
        ctx.stroke();
    });
    updateConfetti();
}

function updateConfetti() {
    confetti.forEach(c => {
        c.y += (Math.cos(c.d) + 3 + c.r / 2) / 2;
        c.x += Math.sin(0.01 * c.d);
        c.tiltAngle += c.tiltAngleIncremental;
        c.tilt = Math.sin(c.tiltAngle) * 15;
        if (c.y > canvas.height) {
            c.x = Math.random() * canvas.width;
            c.y = -10;
        }
    });
}

function animateConfetti() {
    drawConfetti();
    requestAnimationFrame(animateConfetti);
}

for (let i = 0; i < 80; i++) {
    confetti.push(createConfettiPiece());
}
animateConfetti();

// Slider logic
const slides = document.querySelectorAll('.slide');
let current = 0;
document.querySelector('.nav-btn.next').onclick = () => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
};
document.querySelector('.nav-btn.prev').onclick = () => {
    slides[current].classList.remove('active');
    current = (current - 1 + slides.length) % slides.length;
    slides[current].classList.add('active');
};

document.addEventListener('DOMContentLoaded', function () {
    // === PENGATURAN UTAMA ===
    const targetDate = new Date('2025-10-01T00:00:00'); // Tentukan tanggal target
    const now = new Date();

    // === ELEMEN DOM ===
    const countdownContainer = document.getElementById('countdownContainer');
    const scrapbookContent = document.getElementById('scrapbookContent');
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    // === LOGIKA UTAMA: MEMERIKSA TANGGAL ===
    if (now >= targetDate) {
        // Jika sudah waktunya, tampilkan scrapbook
        showScrapbook();
    } else {
        // Jika belum, tampilkan countdown
        startCountdown();
    }

    // === FUNGSI-FUNGSI ===
    function showScrapbook() {
        document.body.style.overflow = 'auto'; // Kembalikan fungsi scroll
        countdownContainer.classList.add('hidden');
        scrapbookContent.classList.remove('hidden');
        initScrapbookSlider();
        startConfetti();
    }

    function startCountdown() {
        updateCountdown(); // Panggil sekali agar tidak ada delay 1 detik
        setInterval(updateCountdown, 1000);
    }

    function updateCountdown() {
        const currentTime = new Date();
        const diff = targetDate - currentTime;

        if (diff <= 0) {
            showScrapbook();
            return;
        }

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        daysEl.innerText = d;
        hoursEl.innerText = h < 10 ? '0' + h : h;
        minutesEl.innerText = m < 10 ? '0' + m : m;
        secondsEl.innerText = s < 10 ? '0' + s : s;
    }

    // --- Logika untuk Slider Scrapbook ---
    function initScrapbookSlider() {
        const slides = document.querySelectorAll('.slide');
        const nextBtn = document.querySelector('.next');
        const prevBtn = document.querySelector('.prev');
        let currentSlide = 0;
        const slideInterval = 5000;

        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }

        let autoPlay = setInterval(nextSlide, slideInterval);

        function resetInterval() {
            clearInterval(autoPlay);
            autoPlay = setInterval(nextSlide, slideInterval);
        }

        nextBtn.addEventListener('click', () => { nextSlide(); resetInterval(); });
        prevBtn.addEventListener('click', () => { prevSlide(); resetInterval(); });

        showSlide(currentSlide);
    }

    // --- Logika untuk Efek Confetti ---
    // GANTI FUNGSI startConfetti() YANG LAMA DENGAN INI
    function startConfetti() {
        const canvas = document.getElementById('confetti');
        const ctx = canvas.getContext('2d');
        let confettiPieces = [];
        const numberOfPieces = 150;
        const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'];

        // Fungsi untuk mengatur ukuran canvas
        function setCanvasSize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        // Fungsi untuk mengisi ulang confetti saat ukuran berubah
        function resetConfetti() {
            confettiPieces = [];
            for (let i = 0; i < numberOfPieces; i++) {
                confettiPieces.push(new Confetti());
            }
        }

        // Atur ukuran saat pertama kali dan saat jendela diubah ukurannya
        setCanvasSize();
        resetConfetti();
        window.addEventListener('resize', () => {
            setCanvasSize();
            resetConfetti();
        });

        function Confetti() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height - canvas.height;
            this.size = Math.random() * 10 + 5;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.speed = Math.random() * 3 + 2;
            this.gravity = 0.5;
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 2 - 1;
        }

        Confetti.prototype.update = function () {
            this.y += this.speed;
            this.speed += this.gravity;
            this.x += Math.sin(this.y / 20) * 2;
            this.rotation += this.rotationSpeed;
            if (this.y > canvas.height) {
                this.y = -20;
                this.x = Math.random() * canvas.width;
            }
        }

        Confetti.prototype.draw = function () {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            ctx.restore();
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            confettiPieces.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        }
        animate();
    }
});
