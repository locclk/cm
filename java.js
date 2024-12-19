let player;
let isMobileDevice = false;

// filepath: /path/to/java.js
// ...existing code...

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAy2WD2O1N7MUC0O3Fe7YOb4SWTyhBIg0s",
    authDomain: "nguyenanh-42cc9.firebaseapp.com",
    projectId: "nguyenanh-42cc9",
    storageBucket: "nguyenanh-42cc9.firebasestorage.app",
    messagingSenderId: "999875066379",
    appId: "1:999875066379:web:ac18cc509d547b874e250e",
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Initialize Cloud Firestore
  const db = firebase.firestore();
  
  // ...existing code...


function onYouTubeIframeAPIReady() {
    player = new YT.Player('backgroundMusic', {
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo(); // Start playing when the player is ready
}

function formatName(name) {
    // Xóa khoảng trắng thừa và chuyển thành lowercase
    name = name.trim().toLowerCase();
    
    // Tách thành các từ
    let words = name.split(' ');
    
    // Định dạng mỗi từ
    words = words.map(word => {
        if (word.length > 0) {
            // Chuyển chữ đầu thành hoa, phần còn lại giữ nguyên lowercase
            return word.charAt(0).toUpperCase() + word.slice(1);
        }
        return word;
    });
    
    // Nối lại các từ
    return words.join(' ');
}

function createStarBackground() {
    const starContainer = document.createElement('div');
    starContainer.className = 'star-background';
    document.querySelector('.start-screen').appendChild(starContainer);

    const numberOfStars = 200;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'twinkling-star';
        
        // Random position
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // Random size (1-3px)
        const size = (Math.random() * 2 + 1);
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random twinkle duration (2-6s)
        star.style.setProperty('--twinkle-duration', `${Math.random() * 4 + 2}s`);
        
        // Random twinkle scale (1-1.5)
        star.style.setProperty('--twinkle-scale', `${Math.random() * 0.5 + 1}`);
        
        // Random delay
        star.style.animationDelay = `${Math.random() * 6}s`;
        
        // Random flicker duration (0.5-1.5s)
        star.style.setProperty('--flicker-duration', `${Math.random() * 1 + 0.5}s`);
        
        // Random flicker delay
        star.style.animationDelay = `${Math.random() * 3}s`;
        
        starContainer.appendChild(star);
    }

    // Thêm các chấm trắng vào start-screen
    const startScreen = document.querySelector('.start-screen');
    const numberOfDots = 50; // Số lượng chấm trắng

    for (let i = 0; i < numberOfDots; i++) {
        const dot = document.createElement('div');
        dot.className = 'start-screen-dot';
        
        // Vị trí ngẫu nhiên trong start-screen
        dot.style.left = `${Math.random() * 100}%`;
        dot.style.top = `${Math.random() * 100}%`;
        
        // Kích thước ngẫu nhiên (3-6px)
        const size = (Math.random() * 3 + 3);
        dot.style.width = `${size}px`;
        dot.style.height = `${size}px`;
        
        // Thời gian chớp tắt ngẫu nhiên (1-3s)
        dot.style.setProperty('--flicker-duration', `${Math.random() * 2 + 1}s`);
        
        startScreen.appendChild(dot);
    }
}

// Function to create sparkling stars
function createDeviceStars() {
    const starContainer = document.querySelector('.device-stars');
    for (let i = 0; i < 50; i++) { // Adjust the number of stars as needed
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        star.style.animationDuration = `${1 + Math.random()}s`;
        starContainer.appendChild(star);
    }
}

// Initialize stars when the device selection screen is shown
document.addEventListener('DOMContentLoaded', createDeviceStars);

window.onload = () => {
    const deviceSelectionScreen = document.querySelector('.device-selection-screen');
    const startScreen = document.querySelector('.start-screen');
    const desktopButton = document.getElementById('desktopButton');
    const mobileButton = document.getElementById('mobileButton');
    const volumeControl = document.querySelector('.volume-control');

    desktopButton.addEventListener('click', () => {
        isMobileDevice = false;
        deviceSelectionScreen.style.display = 'none';
        startScreen.classList.remove('hidden');
        volumeControl.style.display = 'flex'; // Show volume controls
        
        // Remove 'mobile-device' class
        document.body.classList.remove('mobile-device');
        
        // Show both trees
        document.getElementById('tree-left').style.display = 'block';
        document.getElementById('tree-right').style.display = 'block';
    });

    mobileButton.addEventListener('click', () => {
        isMobileDevice = true;
        deviceSelectionScreen.style.display = 'none';
        startScreen.classList.remove('hidden');
        volumeControl.style.display = 'none'; // Hide volume controls
        
        // Add 'mobile-device' class to body
        document.body.classList.add('mobile-device');
        
        // Hide the right tree
        document.getElementById('tree-right').style.display = 'none';
        
        // Adjust the left tree's CSS to center it
        document.getElementById('tree-left').style.margin = '0 auto';
    });

    createStarBackground();
    const startButton = document.getElementById('startButton');
    const animationContainer = document.querySelector('.animation-container');
    const nameInput = document.getElementById('nameInput');

    startButton.addEventListener('click', () => {
        let userName = nameInput.value.trim();
        if (!userName) {
            alert('Please enter your name first!');
            return;
        }

        userName = formatName(userName);
        const normalizedUserName = removeAccents(userName.toLowerCase());
        document.querySelector('.recipient-name').textContent = userName;
        
        // Always start the tree animation
        startTreeAnimation();
        
        // Only show heart animation for 'khanh'
        if (normalizedUserName.includes('khanh')) {
            showHeartAnimation().then(() => {
                showLetter(normalizedUserName);
            });
        } else {
            showLetter(normalizedUserName);
        }

        // Send user input to server
        fetch('/save-input', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ input: userName })
        })
        .then(response => response.text())
        .then(data => {
            console.log(data); // Optional: handle success message
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });

    function showHeartAnimation() {
        return new Promise((resolve) => {
            // Show the heart container
            document.querySelector('.heart-container').classList.remove('hidden');
            // Hide other screens
            startScreen.classList.add('hidden');
            animationContainer.classList.add('hidden');

            // Start the heart animation
            startHeartAnimation();

            // Duration of the heart animation
            setTimeout(() => {
                // Stop the heart animation
                stopHeartAnimation();
                // Hide the heart container
                document.querySelector('.heart-container').classList.add('hidden');
                resolve(); // Resolve the promise after hiding hearts
            }, 4000); // Adjust the duration as needed
        });
    }

    let heartAnimationFrame;
    let hearts = []; // Initialize hearts array

    function startHeartAnimation() {
        const canvas = document.getElementById('pinkboard');
        const ctx = canvas.getContext('2d');

        // Resize canvas to full screen
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        hearts = []; // Reset hearts array
        const maxHearts = 150; // Tăng số lượng trái tim nếu cần

        function addHeart() {
            const directions = ['top', 'bottom', 'left', 'right', 'center']; // Thêm 'center'
            const direction = directions[Math.floor(Math.random() * directions.length)];
            let x, y, dx, dy;

            switch(direction) {
                case 'top':
                    x = Math.random() * canvas.width;
                    y = -20;
                    dx = (Math.random() - 0.5) * 2; // Drift ngang nhẹ
                    dy = Math.random() * 1 + 1;    // Tốc độ xuống
                    break;
                case 'bottom':
                    x = Math.random() * canvas.width;
                    y = canvas.height + 20;
                    dx = (Math.random() - 0.5) * 2;
                    dy = -(Math.random() * 1 + 1);
                    break;
                case 'left':
                    x = -20;
                    y = Math.random() * canvas.height;
                    dx = Math.random() * 1 + 1;    // Tốc độ sang phải
                    dy = (Math.random() - 0.5) * 2;
                    break;
                case 'right':
                    x = canvas.width + 20;
                    y = Math.random() * canvas.height;
                    dx = -(Math.random() * 1 + 1);
                    dy = (Math.random() - 0.5) * 2;
                    break;
                case 'center': // Thêm trường hợp 'center'
                    x = canvas.width / 2;
                    y = canvas.height / 2;
                    const angle = Math.random() * 2 * Math.PI;
                    const speed = Math.random() * 2 + 1;
                    dx = Math.cos(angle) * speed;
                    dy = Math.sin(angle) * speed;
                    break;
            }

            hearts.push({
                x: x,
                y: y,
                size: Math.random() * 2 + 1,
                speedX: dx,
                speedY: dy,
                opacity: Math.random() * 0.5 + 0.5,
            });
        }

        function drawHeart(heart) {
            ctx.save();
            ctx.globalAlpha = heart.opacity;
            ctx.fillStyle = 'red';
            ctx.beginPath();
            const x = heart.x;
            const y = heart.y;
            const size = 15 * heart.size;
            ctx.moveTo(x, y);
            ctx.bezierCurveTo(x + size / 2, y - size / 2, x + size * 1.5, y + size / 3, x, y + size);
            ctx.bezierCurveTo(x - size * 1.5, y + size / 3, x - size / 2, y - size / 2, x, y);
            ctx.fill();
            ctx.restore();
        }

        function animateHearts() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < hearts.length; i++) {
                hearts[i].x += hearts[i].speedX;
                hearts[i].y += hearts[i].speedY;
                drawHeart(hearts[i]);
            }
            // Remove hearts that are off-screen
            hearts = hearts.filter(heart => (
                heart.x > -20 && heart.x < canvas.width + 20 &&
                heart.y > -20 && heart.y < canvas.height + 20
            ));
            if (hearts.length < maxHearts) {
                addHeart();
            }
            heartAnimationFrame = requestAnimationFrame(animateHearts);
        }

        // Phát nhạc từ YouTube khi bắt đầu hoạt hình trái tim
        if (player && typeof player.playVideo === 'function') {
            player.playVideo();
        }

        animateHearts();
    }

    function stopHeartAnimation() {
        cancelAnimationFrame(heartAnimationFrame);
    }

    function showLetter(normalizedUserName) {
        let messageContent;
        if (normalizedUserName.includes('khanh')) {
            messageContent = "Chúc Em có một mùa Giáng sinh an lành bên Người Thân, Bạn Bè và Anh!\n\nMong rằng mỗi khoảnh khắc của em đều tràn đầy niềm vui và hạnh phúc. Anh cảm ơn em vì đã làm cho cuộc sống của anh thêm ý nghĩa. Hy vọng rằng chúng ta sẽ cùng nhau trải qua nhiều Giáng Sinh vui vẻ và hạnh phúc hơn nữa. Chúc em có một mùa Giáng Sinh an lành, tràn ngập yêu thương và những điều tuyệt vời nhất. Anh yêu Em!";
        } else {
            // All other names get the same message as 'tan'
            const userName = document.querySelector('.recipient-name').textContent;
            messageContent = `Giáng sinh đã đến, chúc ${userName} có một giáng sinh vui vẻ bên gia đình và bạn bè!
    
Mong mọi điều tốt đẹp đến với bạn, mong ${userName} thành công vui vẻ trong năm mới. Hy vọng rằng chúng ta sẽ vẫn là bạn bè, đồng hành cùng nhau trong nhiều giáng sinh tới!\n\n Chúc gia đình ${userName} cũng sẽ nhận được nhiều phúc lành từ chúa nha!\n\n Merry Christmas!`;
        }
        
        document.querySelector('.letter-body').textContent = messageContent;

        // Hide the start screen
        startScreen.classList.add('hidden');

        // Show the animation container
        animationContainer.classList.remove('hidden');

        // Play background music
        if (!isMobileDevice && player && typeof player.playVideo === 'function') {
            player.playVideo();
        }

        // Allow the animation box to appear after transitioning
        setTimeout(() => {
            animationContainer.classList.add('visible');
            document.body.classList.remove("not-loaded");

            // Đợi cho cây được vẽ xong (khoảng 4 giây) rồi mới đổi nền
            setTimeout(() => {
                // Đổi màu nền
                document.body.classList.add('bg-dark-transition');
                
                // Sau đó thêm tuyết và các hiệu ứng khác
                createSnow();
                addDecorations('.decorations-left');
                if (!isMobileDevice) {
                    addDecorations('.decorations-right');
                }
                addLedLights('.decorations-left');
                if (!isMobileDevice) {
                    addLedLights('.decorations-right');
                }
                createStars();
                document.querySelector('.letter').style.opacity = '1';
                document.querySelector('.letter').style.transform = 'translate(-50%, -50%) scale(1)';
            }, 4000); // Đợi 4 giây sau khi cây được vẽ xong

        }, 500);

        startTreeAnimation();
    }

    // Thêm xử lý sự kiện cho nút back
    const backButton = document.getElementById('backButton');
    backButton.addEventListener('click', () => {
        // Reset animation container
        animationContainer.classList.add('hidden');
        animationContainer.classList.remove('visible');
        
        // Hiện lại màn hình start
        startScreen.classList.remove('hidden');
        
        // Reset background
        document.body.classList.remove('bg-transition');
        document.body.classList.add('not-loaded');
        
        // Xóa tuyết
        document.querySelector('.snow-container').innerHTML = '';
        
        // Dừng nhạc
        if (player && typeof player.pauseVideo === 'function') {
            player.pauseVideo();
        }
        
        // Clear input
        nameInput.value = '';
        
        // Reset các animation khác nếu cần
        document.querySelectorAll('.led-light').forEach(light => light.remove());
        document.querySelectorAll('.decorations-left, .decorations-right').forEach(dec => dec.innerHTML = '');
        document.body.classList.remove('bg-dark-transition');
        document.querySelectorAll('.star').forEach(star => star.remove());
    });

    // Volume control functionality
    const volumeBtn = document.getElementById('volumeBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    let isMuted = false;
    let lastVolume = 50;

    volumeBtn.addEventListener('click', () => {
        if (isMuted) {
            player.unMute();
            player.setVolume(lastVolume);
            volumeSlider.value = lastVolume;
        } else {
            lastVolume = player.getVolume();
            player.mute();
            volumeSlider.value = 0;
        }
        isMuted = !isMuted;
    });

    volumeSlider.addEventListener('input', (e) => {
        const volume = e.target.value;
        if (player && typeof player.setVolume === 'function') {
            player.setVolume(volume);
            if (volume > 0) {
                player.unMute();
                isMuted = false;
            }
        }
    });

    if (typeof onYouTubeIframeAPIReady === 'function') {
        const originalFunction = onYouTubeIframeAPIReady;
        onYouTubeIframeAPIReady = function() {
            if (!isMobileDevice) {
                originalFunction();
            }
        };
    }

    function startTreeAnimation() {
        // Reset animations
        document.querySelectorAll('.outline, .fill').forEach(element => {
            element.style.animation = 'none';
            element.offsetHeight; // Trigger reflow
            element.style.animation = null;
        });

        // Remove 'not-loaded' class để bắt đầu animation
        document.body.classList.remove('not-loaded');

        // Đợi cho cây được vẽ xong (khoảng 4 giây) rồi mới đổi nền
        setTimeout(() => {
            // Thêm class để chuyển sang nền tối
            document.body.classList.add('bg-dark-transition');
            
            // Thêm các hiệu ứng khác sau khi đã chuyển nền
            setTimeout(() => {
                createSnow();
                addDecorations('.decorations-left');
                if (!isMobileDevice) {
                    addDecorations('.decorations-right');
                }
                addLedLights('.decorations-left');
                if (!isMobileDevice) {
                    addLedLights('.decorations-right');
                }
                createStars();
                document.querySelector('.letter').style.opacity = '1';
                document.querySelector('.letter').style.transform = 'translate(-50%, -50%) scale(1)';
            }, 2000); // Đợi 2 giây sau khi bắt đầu chuyển nền
            
        }, 6000); // Đợi 4 giây sau khi cây được vẽ xong
    }

    // Lưu tên vào Firestore
    startButton.addEventListener('click', () => {
        const name = nameInput.value.trim();

        if (name) {
            db.collection('users').add({
                name: name,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                console.log('Tên đã được lưu vào Firebase');
                // Xử lý sau khi lưu thành công (nếu cần)
            })
            .catch((error) => {
                console.error('Lỗi khi lưu tên vào Firebase: ', error);
            });
        } else {
            alert('Vui lòng nhập tên của bạn');
        }
    });
};

function createSnow() {
    const container = document.querySelector('.snow-container');
    const snowflakeCount = 200; // Tăng từ 50

    for (let i = 0; i < snowflakeCount; i++) {
        const snow = document.createElement('div');
        snow.className = 'snow';
        snow.style.left = Math.random() * 100 + '%';
        snow.style.opacity = Math.random() * 0.7 + 0.3;
        snow.style.animationDuration = Math.random() * 8 + 5 + 's'; // Thời gian ngẫu nhiên giữa 5-13s
        snow.style.animationDelay = Math.random() * 5 + 's';
        // Kích thước ngẫu nhiên giữa 2-4px
        const size = Math.random() * 2 + 2;
        snow.style.width = size + 'px';
        snow.style.height = size + 'px';
        container.appendChild(snow);
    }
}

function addDecorations(selector) {
    const decorations = document.querySelector(selector);
    
    // Thêm ngôi sao
    const star = document.createElementNS("http://www.w3.org/2000/svg", "path");
    star.setAttribute("class", "star");
    star.setAttribute("d", "M500,50 L520,90 L560,90 L530,115 L540,155 L500,130 L460,155 L470,115 L440,90 L480,90 Z");
    
    // Set random flicker duration and delay
    star.style.setProperty('--flicker-duration', `${Math.random() * 1 + 0.5}s`); // 0.5-1.5s
    star.style.animationDelay = `${Math.random() * 3}s`; // 0-3s
    
    decorations.appendChild(star);
    
    // Vị trí và thuộc tính cho các quả cầu
    const baubles = [
        // Top layer
        {cx: 450, cy: 250, r: 10, class: 'gold'},
        {cx: 550, cy: 250, r: 10, class: 'red'},
        
        // Second layer
        {cx: 400, cy: 350, r: 12, class: 'blue'},
        {cx: 500, cy: 380, r: 12, class: 'gold'},
        {cx: 600, cy: 350, r: 12, class: 'red'},
        
        // Third layer
        {cx: 350, cy: 450, r: 15, class: 'red'},
        {cx: 450, cy: 480, r: 15, class: 'blue'},
        {cx: 550, cy: 480, r: 15, class: 'gold'},
        {cx: 650, cy: 450, r: 15, class: 'red'},
        
        // Fourth layer
        {cx: 300, cy: 600, r: 12, class: 'gold'},
        {cx: 400, cy: 630, r: 12, class: 'red'},
        {cx: 500, cy: 650, r: 12, class: 'blue'},
        {cx: 600, cy: 630, r: 12, class: 'gold'},
        {cx: 700, cy: 600, r: 12, class: 'red'},
        
        // Bottom layer
        {cx: 350, cy: 750, r: 15, class: 'blue'},
        {cx: 450, cy: 780, r: 15, class: 'gold'},
        {cx: 550, cy: 780, r: 15, class: 'red'},
        {cx: 650, cy: 750, r: 15, class: 'blue'}
    ];
    
    // Thêm tất cả các quả cầu với hoạt ảnh lặp lại
    baubles.forEach((bauble, index) => {
        const ball = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        ball.style.setProperty('--appear-delay', `${1 + index * 0.1}s`);
        ball.style.setProperty('--blink-delay', `${index * 0.5}s`);
        ball.setAttribute("cx", bauble.cx);
        ball.setAttribute("cy", bauble.cy);
        ball.setAttribute("r", bauble.r);
        ball.setAttribute("class", `bauble ${bauble.class}`);
        ball.style.animation = `appear 0.5s ease forwards ${1 + index * 0.1}s, blink 2s infinite ${index * 0.5}s`;
        decorations.appendChild(ball);
    });
}

function addLedLights(selector) {
    const decorations = document.querySelector(selector).closest('svg').querySelector('.led-lights');
    const paths = [
        document.getElementById('led-path-left'),
        document.getElementById('led-path-left-1'),
        document.getElementById('led-path-left-2'),
        document.getElementById('led-path-left-3'),
        document.getElementById('led-path-left-4'),
        document.getElementById('led-path-left-5'),
        document.getElementById('led-path-right'),
        document.getElementById('led-path-right-1'),
        document.getElementById('led-path-right-2'),
        document.getElementById('led-path-right-3'),
        document.getElementById('led-path-right-4'),
        document.getElementById('led-path-right-5'),
    ];
    const colors = ['red', 'yellow', 'blue', 'green', 'purple', 'white'];

    paths.forEach((path) => {
        if (!path) return; // Kiểm tra xem path có tồn tại không
        const pathLength = path.getTotalLength();
        const numLights = 30; // Số đèn trên mỗi dây
        for (let i = 0; i <= numLights; i++) {
            const point = path.getPointAtLength((i / numLights) * pathLength);
            const light = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            light.setAttribute('class', 'led-light');
            light.setAttribute('cx', point.x);
            light.setAttribute('cy', point.y);
            light.setAttribute('r', 5);

            // Chọn màu ngẫu nhiên cho đèn
            const color = colors[Math.floor(Math.random() * colors.length)];
            light.style.fill = color;
            light.style.filter = `drop-shadow(0 0 5px ${color})`;

            // Thời gian trễ chớp tắt
            light.style.animationDelay = `${Math.random() * 2}s`;

            decorations.appendChild(light);
        }
    });
}

// Thêm vào function bắt đầu animation
function startTreeAnimation() {
    // Reset các animations
    document.querySelectorAll('.outline, .fill').forEach(element => {
        element.style.animation = 'none';
        element.offsetHeight; // Trigger reflow
        element.style.animation = null;
    });

    // Thêm class để bắt đầu animations
    document.body.classList.remove('not-loaded');

    // Thêm hiệu ứng ánh sáng sau khi cây được vẽ xong
    setTimeout(() => {
        const treeElements = document.querySelectorAll('.tree-fill-1, .tree-fill-2, .tree-fill-3, .tree-fill-4');
        treeElements.forEach(element => {
            element.style.transition = 'filter 0.36s ease'; // Increased from 0.3s to 0.36s (20% slower)
            element.style.filter = 'brightness(1.1) url(#treeGlow)';
        });
    }, 4000); // Increased from 3300 to 4000 (20% slower)
}

function removeAccents(str) {
    // Remove Vietnamese accents
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function createHearts() {
    const canvas = document.getElementById('pinkboard');
    const ctx = canvas.getContext('2d');
    const numberOfHearts = 50; // Increase the number from its current value
    for (let i = 0; i < numberOfHearts; i++) {
        // Example heart creation logic
        hearts.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            speed: Math.random() * 1 + 1,
            opacity: Math.random() * 0.5 + 0.5,
            drift: Math.random() * 2 - 1,
        });
    }
    animateHearts();
}

function createStars() {
    const container = document.querySelector('.animation-container');
    const starCount = 200;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        container.appendChild(star);
    }
}