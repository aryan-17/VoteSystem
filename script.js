document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    if (localStorage.getItem('isLoggedIn')) {
        showVoteSection();
    } else {
        showLoginSection();
    }
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Here you would typically validate the credentials against a database
    // For simplicity, we'll use hardcoded values for demo purposes
    if (username === 'admin' && password === 'password') {
        localStorage.setItem('isLoggedIn', true);
        showVoteSection();
    } else {
        displayLoginMessage('Invalid username or password.', 'error');
    }
});

document.getElementById('voteForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const selectedOption = document.querySelector('input[name="vote"]:checked');
    if (!selectedOption) {
        displayVoteMessage('Please select an option.', 'error');
        return;
    }

    // Vote submission logic
    // This would typically handle vote recording and validation
    // For demo purposes, we'll just display a message
    const vote = selectedOption.value;
    const voteCountElement = document.getElementById('voteCount' + vote.charAt(vote.length - 1));
    voteCountElement.textContent = parseInt(voteCountElement.textContent)+1;
    localStorage.setItem('voteCount'+vote.charAt(vote.length - 1),parseInt(voteCountElement.textContent))
    calculatePercentage(vote.charAt(vote.length - 1));
    displayVoteMessage('Vote submitted successfully. Thank you!', 'success');
});

document.getElementById('resetVotes').addEventListener('click', function() {
    // Reset votes logic
    // This would typically reset the vote counts and associated data
    // For demo purposes, we'll just display a message
    for (let i = 1; i <= 3; i++) {
        localStorage.setItem('voteCount' + i, 0);
        document.getElementById('voteCount' + i).textContent = 0;
        document.getElementById('resultCount' + i).textContent = 0;
        document.getElementById('resultPercentage' + i).textContent = 0;
    }
    displayVoteMessage('Votes reset successfully.', 'success');
});

function showLoginSection() {
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('voteSection').style.display = 'none';
    document.getElementById('voteResults').style.display = 'none';
}

function showVoteSection() {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('voteSection').style.display = 'block';
    document.getElementById('voteResults').style.display = 'block';
}

function displayLoginMessage(message, type) {
    const messageElement = document.getElementById('loginMessage');
    messageElement.textContent = message;
    messageElement.className = type;
}

function displayVoteMessage(message, type) {
    const messageElement = document.getElementById('voteMessage');
    messageElement.textContent = message;
    messageElement.className = type;
}

function calculatePercentage(optionNumber) {
    const totalVotesCount = parseInt(localStorage.getItem('voteCount1')||0) + parseInt(localStorage.getItem('voteCount2')||0) + parseInt(localStorage.getItem('voteCount3')||0);
    console.log(totalVotesCount);
    for (let i = 1; i <= 3; i++) {
        const voteCount = parseInt(localStorage.getItem('voteCount' + i)) || 0;
        const percentage = totalVotesCount > 0 ? ((voteCount / totalVotesCount) * 100).toFixed(2) : 0;
        document.getElementById('resultCount' + i).textContent = parseInt(localStorage.getItem('voteCount'+i));
        document.getElementById('resultPercentage' + i).textContent = percentage;
    }
}
