import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Peer from 'peerjs';
import { useParams } from 'react-router-dom';

import './App.css';

const SOCKET_URL = 'http://127.0.0.1:8000';
// const SOCKET_URL = 'https://video-conference-x2fq.onrender.com/'

let myStream, peer;
let peers = [];
let socket = io(SOCKET_URL);

socket.on('connect', () => {
  console.log('Сокет подключен:', socket.id);
});

const Video = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [muted, setMuted] = useState(false);
  const [hideVideo, setHideVideo] = useState(false);
  const [myStreamState, setMyStream] = useState(null);

  const { roomId } = useParams();

  useEffect(() => {
    const handleReceiveMessage = () => {
      socket.on('createMessage', (message) => {
        setMessages([...messages, message]);
      });
    };
    setInterval(handleReceiveMessage(), 100);
    return () => {
      socket.off();
    };
  });

  useEffect(() => {
    peer = new Peer(undefined, {
      path: '/peerjs',
      host: '/'
      ,port: 8000,
    });

    peer.on('open', (id) => {
      socket.emit('join-room', roomId, id);
    });

    const getMedia =
      navigator.mediaDevices?.getUserMedia ||
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

      if (getMedia) {
        getMedia.call(navigator, { video: true, audio: true })
          .then((stream) => {
            myStream = stream;
            setMyStream(stream)
            const myVideo = document.createElement('video');
            handleAddVideoStream(myVideo, myStream);
            handleAnswerCall(stream);
          })
          .catch((error) => {
            console.error("Xato yuz berdi:", error);
          });
      } else {
        console.error("getUserMedia API qo‘llab-quvvatlanmaydi.");
      }


    socket.on('user-disconnected', (userId) => {
      if (peers[userId]) peers[userId].close();
      socket.disconnect();
    });

    const handleAnswerCall = (stream) => {
      peer.on('call', (call) => {
        call.answer(stream);
        const video = document.createElement('video');
        call.on('stream', (userVideoStream) => {
          handleAddVideoStream(video, userVideoStream);
        });
      });
    };

    const handleNewUserJoin = () => {
      socket.on('user-connected', (userId) => {
        navigator.mediaDevices
          .getUserMedia({
            video: true,
            audio: true
          })
          .then((stream) => {

            setMyStream(stream)
            const call = peer.call(userId, stream);
            if (!call) {
              console.error('Failed to initiate call');
            } else {
              console.log('Call initiated:', call);
            }

            const userVideo = document.createElement('video');

            call.on('stream', (userVideoStream) => {
              console.log('Call On Stream ', userVideoStream);

              handleAddVideoStream(userVideo, userVideoStream);
            });

            call.on('close', () => {
              userVideo.remove();
            });

            peers[userId] = call;
          })
          .catch((error) => {
            console.error(error);
          });
      });
    };

    handleNewUserJoin();

    return () => {
      socket.off();
    };
  }, [roomId]);

  const handleAddVideoStream = (video, stream) => {
    const videoGrid = document.getElementById('video-grid');
    video.srcObject = stream;

    video.addEventListener('loadedmetadata', () => {
      video.play();
      video.muted = true;
    });
    videoGrid.append(video);
  };

  // Handlining Mute And Unmute
  const handleMuteUnmute = () => {
    console.log('Handle Mute 1');

    if (!myStreamState) return; // Проверка, если поток доступен
    console.log('Handle Mute 2');

    const audioTrack = myStreamState.getAudioTracks()[0];
    console.log('Handle Mute 3');
    if (audioTrack) {
      console.log('Handle Mute 4');
      audioTrack.enabled = !audioTrack.enabled;
      setMuted(!audioTrack.enabled); // Обновите состояние mute
    }
  };

  const handlePlayStopVideo = () => {
    if (!myStreamState) return; // Проверка, если поток доступен

    const videoTrack = myStreamState.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      setHideVideo(!videoTrack.enabled); // Обновите состояние video
    }
  };

  // MESSAGE PART
  const handleMessage = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    socket.emit('message', { message: message, userId: peer.id });
    setMessage('');
    event.target.reset();
  };

  const handleLeaveMeet = () => {
    window.location.href = '/';
  };

  return (
    <>
      <header>
        <div className="header">
          <p>VIDEO CONFERENCE</p>
          <p>ROOM ID: {roomId}</p>
        </div>
      </header>

      <div className="show-case">
        <div className="main-left">
          <div className="videos-grp">
            <div id="video-grid"></div>
          </div>

          <div className="options">
            <div className="options-left">
              <div id="muteButton" className="options-button" onClick={handleMuteUnmute}>
                <i className={`fa fa-${muted ? 'microphone' : 'microphone-slash'}`}></i>
              </div>
              <div id="stopVideo" className="options-button" onClick={handlePlayStopVideo}>
                <i className={`fa fa-${hideVideo ? 'video' : 'video-slash'}`}></i>
              </div>
            </div>
            <div className="options-right">
              <div className="leave-meet">
                <button onClick={handleLeaveMeet}>Leave Meeting</button>
              </div>
            </div>
          </div>
        </div>

        <div className="main-right">
          <div className="main-chat-window">
            <div className="messages">
              {messages.map((msg, idx) => (
                <div key={idx} className="msg chat">
                  <p key={idx}>{msg}</p>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSendMessage}>
            <div className="main-message-container">
              <input
                id="chat-message"
                type="text"
                onChange={handleMessage}
                autoComplete="off"
                placeholder="Type message here..."
                required
              />

              <button type="submit" id="send" className="options-button">
                <i className="fab fa-telegram-plane"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Video;
