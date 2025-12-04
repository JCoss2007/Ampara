document.addEventListener('DOMContentLoaded', () => {
    // 1. OBTENER ELEMENTOS DEL DOM
    const chatForm = document.getElementById('chatForm');
    const messageInput = document.getElementById('messageInput');
    const chatMessagesArea = document.getElementById('chatMessagesArea');
    const micButton = document.getElementById('micButton');
    
    // Elementos del menú desplegable
    const optionsBtn = document.getElementById('optionsBtn');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const btnEndChat = document.getElementById('btnEndChat');

    // 2. VARIABLES DE GRABACIÓN
    let mediaRecorder;
    let audioChunks = [];
    let isRecording = false;

    // --- FUNCIONES UTILITARIAS ---
    function scrollToBottom() {
        chatMessagesArea.scrollTop = chatMessagesArea.scrollHeight;
    }

    function getCurrentTime() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; 
        return `${hours}:${minutes} ${ampm}`;
    }

    // --- FUNCIÓN PARA CREAR REPRODUCTOR DE AUDIO (Estilo Ondas) ---
    function createCustomAudioPlayer(audioUrl) {
        const playerContainer = document.createElement('div');
        playerContainer.classList.add('custom-audio-player');

        // Elemento de audio real (oculto)
        const audioEl = document.createElement('audio');
        audioEl.src = audioUrl;
        audioEl.style.display = 'none'; 

        // Botón Play/Pause
        const playBtn = document.createElement('button');
        playBtn.classList.add('audio-control-btn');
        playBtn.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
            </svg>`;

        // Visualizador de ondas
        const waveContainer = document.createElement('div');
        waveContainer.classList.add('audio-wave');

        for (let i = 0; i < 20; i++) {
            const bar = document.createElement('div');
            bar.classList.add('wave-bar');
            bar.style.height = Math.floor(Math.random() * 60 + 20) + '%'; 
            waveContainer.appendChild(bar);
        }

        // Lógica de reproducción
        playBtn.addEventListener('click', () => {
            if (audioEl.paused) {
                audioEl.play();
                playerContainer.classList.add('playing');
                playBtn.innerHTML = `
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                    </svg>`;
            } else {
                audioEl.pause();
                playerContainer.classList.remove('playing');
                playBtn.innerHTML = `
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z"/>
                    </svg>`;
            }
        });

        audioEl.addEventListener('ended', () => {
            playerContainer.classList.remove('playing');
            playBtn.innerHTML = `
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                </svg>`;
        });

        playerContainer.appendChild(playBtn);
        playerContainer.appendChild(waveContainer);
        playerContainer.appendChild(audioEl);

        return playerContainer;
    }

    // --- FUNCIÓN PARA AGREGAR MENSAJES ---
    function addMessage(content, type, isAudio = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', type);

        const bubbleDiv = document.createElement('div');
        bubbleDiv.classList.add('message-bubble');
        
        if (isAudio) {
            const customPlayer = createCustomAudioPlayer(content);
            bubbleDiv.appendChild(customPlayer);
        } else {
            const pText = document.createElement('p');
            pText.textContent = content;
            bubbleDiv.appendChild(pText);
        }

        const timeSpan = document.createElement('span');
        timeSpan.classList.add('message-time');
        timeSpan.textContent = getCurrentTime();

        messageDiv.appendChild(bubbleDiv);
        messageDiv.appendChild(timeSpan);

        chatMessagesArea.appendChild(messageDiv);
        scrollToBottom();
    }

    // --- CEREBRO DEL PSICÓLOGO ---
    function triggerAutoResponse(esRespuestaDeAudio = false) {
        const tiempoDeEspera = esRespuestaDeAudio ? 3000 : 1500;

        setTimeout(() => {
            let respuestas;
            if (esRespuestaDeAudio) {
                respuestas = [
                    "He escuchado tu nota de voz atentamente. Gracias por confiar en mí.",
                    "Entiendo por tu voz que esto es importante. Cuéntame más.",
                    "Gracias por el audio. Estoy procesando lo que me cuentas.",
                    "Tomate tu tiempo, aquí estoy para escucharte.",
                    "Percibo mucha emoción en tu voz. ¿Cómo te sientes ahora?"
                ];
            } else {
                respuestas = [
                    "Te entiendo perfectamente.",
                    "Cuéntame más sobre eso, por favor.",
                    "¿Te sientes segura donde estás?",
                    "Aquí estoy para escucharte con confidencialidad.",
                    "¿Desde hace cuánto tiempo te sientes así?"
                ];
            }
            const randomRes = respuestas[Math.floor(Math.random() * respuestas.length)];
            addMessage(randomRes, 'received');
        }, tiempoDeEspera);
    }

    // --- EVENTO: ENVIAR TEXTO ---
    if (chatForm) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const messageText = messageInput.value.trim();
            if (messageText !== "") {
                addMessage(messageText, 'sent');
                messageInput.value = '';
                messageInput.focus();
                triggerAutoResponse(false); 
            }
        });
    }

    // --- EVENTO: GRABAR AUDIO ---
    if (micButton) {
        micButton.addEventListener('click', async () => {
            if (!isRecording) {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                    mediaRecorder = new MediaRecorder(stream);
                    audioChunks = [];

                    mediaRecorder.ondataavailable = event => {
                        audioChunks.push(event.data);
                    };

                    mediaRecorder.onstop = () => {
                        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                        const audioUrl = URL.createObjectURL(audioBlob);
                        
                        addMessage(audioUrl, 'sent', true);
                        triggerAutoResponse(true);
                    };

                    mediaRecorder.start();
                    isRecording = true;
                    micButton.classList.add('recording');
                } catch (err) {
                    console.error("Error micrófono:", err);
                    alert("Necesitamos permiso del micrófono.");
                }
            } else {
                if (mediaRecorder) {
                    mediaRecorder.stop();
                    isRecording = false;
                    micButton.classList.remove('recording');
                }
            }
        });
    }

    // --- LÓGICA DEL MENÚ SIMPLIFICADO ---
    
    // 1. Mostrar / Ocultar menú
    if (optionsBtn && dropdownMenu) {
        optionsBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita que el clic se pierda
            dropdownMenu.classList.toggle('show');
        });

        // Cerrar menú si haces clic fuera
        document.addEventListener('click', () => {
            dropdownMenu.classList.remove('show');
        });
    }

    // 2. Funcionalidad: FINALIZAR CHAT
    if (btnEndChat) {
        btnEndChat.addEventListener('click', () => {
            const confirmacion = confirm("¿Estás segura de que deseas finalizar el chat?");
            
            if (confirmacion) {
                // Redirigir a Servicios
                window.location.href = 'ampara.html';
            }
        });
    }
});