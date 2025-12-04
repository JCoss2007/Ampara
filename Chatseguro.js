document.addEventListener('DOMContentLoaded', () => {
    // 1. OBTENER ELEMENTOS DEL DOM
    const chatForm = document.getElementById('chatForm');
    const messageInput = document.getElementById('messageInput');
    const chatMessagesArea = document.getElementById('chatMessagesArea');
    const micButton = document.getElementById('micButton');
    
    // Elementos del menú
    const optionsBtn = document.getElementById('optionsBtn');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const btnEndChat = document.getElementById('btnEndChat');
    const btnTranscript = document.getElementById('btnTranscript'); // Botón de transcripción

    // 2. VARIABLES DE AUDIO
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

    // --- REPRODUCTOR DE AUDIO (Estilo Ondas) ---
    function createCustomAudioPlayer(audioUrl) {
        const playerContainer = document.createElement('div');
        playerContainer.classList.add('custom-audio-player');

        const audioEl = document.createElement('audio');
        audioEl.src = audioUrl;
        audioEl.style.display = 'none'; 

        const playBtn = document.createElement('button');
        playBtn.classList.add('audio-control-btn');
        playBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;

        const waveContainer = document.createElement('div');
        waveContainer.classList.add('audio-wave');

        for (let i = 0; i < 20; i++) {
            const bar = document.createElement('div');
            bar.classList.add('wave-bar');
            bar.style.height = Math.floor(Math.random() * 60 + 20) + '%'; 
            waveContainer.appendChild(bar);
        }

        playBtn.addEventListener('click', () => {
            if (audioEl.paused) {
                audioEl.play();
                playerContainer.classList.add('playing');
                playBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
            } else {
                audioEl.pause();
                playerContainer.classList.remove('playing');
                playBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
            }
        });

        audioEl.addEventListener('ended', () => {
            playerContainer.classList.remove('playing');
            playBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
        });

        playerContainer.appendChild(playBtn);
        playerContainer.appendChild(waveContainer);
        playerContainer.appendChild(audioEl);

        return playerContainer;
    }

    // --- AGREGAR MENSAJE ---
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
            pText.innerHTML = content; // Usamos innerHTML para permitir negritas
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

    // --- CEREBRO DE LA PSICÓLOGA (RESPUESTAS) ---
    function triggerAutoResponse(esRespuestaDeAudio = false) {
        const tiempoDeEspera = esRespuestaDeAudio ? 3000 : 2000;

        setTimeout(() => {
            let respuestas;
            if (esRespuestaDeAudio) {
                respuestas = [
                    "Gracias Fab Q. Escucho mucha preocupación en tu voz, vamos a trabajar en ello paso a paso.",
                    "He recibido tu audio. Es totalmente válido que te sientas así dada la situación.",
                    "Entiendo. Tomaré nota de esto en tu expediente para nuestra próxima sesión.",
                    "Gracias por compartirlo. ¿Hay algo específico que detonó esa emoción hoy?"
                ];
            } else {
                respuestas = [
                    "Entiendo, Fab Q. ¿Te gustaría que exploremos más a fondo por qué sucede eso?",
                    "Recuerda que este es un proceso y cada paso cuenta. ¿Cómo reaccionaste en ese momento?",
                    "Estoy revisando tus notas anteriores y veo un patrón similar. ¿Crees que está relacionado?",
                    "Claro. ¿Qué herramientas de las que hemos hablado has podido poner en práctica?",
                    "Te leo con atención. Tómate tu tiempo para explicarme los detalles."
                ];
            }
            const randomRes = respuestas[Math.floor(Math.random() * respuestas.length)];
            addMessage(randomRes, 'received');
        }, tiempoDeEspera);
    }

    // --- EVENTOS DE ENVÍO (TEXTO) ---
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

    // --- EVENTOS DE GRABACIÓN (AUDIO) ---
    if (micButton) {
        micButton.addEventListener('click', async () => {
            if (!isRecording) {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                    mediaRecorder = new MediaRecorder(stream);
                    audioChunks = [];
                    mediaRecorder.ondataavailable = event => audioChunks.push(event.data);
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
                    console.error(err);
                    alert("Permiso de micrófono requerido.");
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

    // --- LÓGICA DEL MENÚ ---
    if (optionsBtn && dropdownMenu) {
        optionsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle('show');
        });
        document.addEventListener('click', () => {
            dropdownMenu.classList.remove('show');
        });
    }

    // --- LÓGICA DE SALIDA ---
    if (btnEndChat) {
        btnEndChat.addEventListener('click', () => {
            const confirmacion = confirm("¿Deseas finalizar la sesión segura?");
            if (confirmacion) {
                window.location.href = 'hablarahora.html';
            }
        });
    }

    // --- LÓGICA DE TRANSCRIPCIÓN (NUEVO) ---
    if (btnTranscript) {
        btnTranscript.addEventListener('click', () => {
            // 1. Alerta de seguridad importante
            const confirmSafety = confirm(
                "Estás a punto de descargar una copia de este chat.\n" +
                "Si este dispositivo es compartido, alguien más podría leerlo.\n\n" +
                "¿Deseas continuar y guardar el archivo?"
            );

            if (confirmSafety) {
                // 2. Construir el texto
                let transcriptionText = "HISTORIAL DE SESIÓN - AMPARA (CONFIDENCIAL)\n";
                transcriptionText += "Fecha: " + new Date().toLocaleString() + "\n";
                transcriptionText += "Paciente: Fab Q\n";
                transcriptionText += "Especialista: Lic. María\n";
                transcriptionText += "========================================\n\n";

                const messages = document.querySelectorAll('.message');
                messages.forEach(msg => {
                    const isSent = msg.classList.contains('sent');
                    const author = isSent ? "FAB Q (PACIENTE)" : "LIC. MARÍA (PSICÓLOGA)";
                    const time = msg.querySelector('.message-time').innerText;
                    
                    let content = "";
                    const textP = msg.querySelector('p');
                    const audioEl = msg.querySelector('audio');

                    if (textP) {
                        content = textP.innerText;
                    } else if (audioEl) {
                        content = "[Nota de voz enviada - Audio no disponible en texto]";
                    }

                    transcriptionText += `[${time}] ${author}: ${content}\n`;
                });

                transcriptionText += "\n========================================\n";
                transcriptionText += "Fin del registro.";

                // 3. Crear y descargar el archivo blob
                const blob = new Blob([transcriptionText], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'registro_chat_ampara_seguro.txt';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                
                // Limpieza
                URL.revokeObjectURL(url);
            }
        });
    }
});