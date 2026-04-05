// PJ SYSTEMS - Professional OTP Script
let generatedOTP = "";

async function sendOTP() {
    const userEmail = document.getElementById('userEmail').value;
    const otpBtn = document.getElementById('sendOtpBtn');

    if (!userEmail.includes("@")) {
        alert("कृपया सही ईमेल एड्रेस डालें!");
        return;
    }

    // 6 अंकों का OTP बनाना
    generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
    
    otpBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> भेज रहे हैं...';
    otpBtn.disabled = true;

    // EmailJS के जरिए ईमेल भेजना
    const templateParams = {
        to_email: userEmail,
        otp_code: generatedOTP,
        school_name: "पटेल आदर्श विद्या निकेतन"
    };

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function() {
            alert("सफलता! OTP आपके ईमेल पर भेज दिया गया है।");
            document.getElementById('otpVerifySection').style.display = 'block';
            otpBtn.innerHTML = 'OTP पुनः भेजें';
            otpBtn.disabled = false;
        }, function(error) {
            alert("भेजने में विफल: " + JSON.stringify(error));
            otpBtn.innerHTML = 'फिर से कोशिश करें';
            otpBtn.disabled = false;
        });
}

function verifyOTP() {
    const enteredOTP = document.getElementById('userOtpInput').value;
    const submitBtn = document.getElementById('finalSubmitBtn');

    if (enteredOTP === generatedOTP) {
        alert("वेरिफिकेशन सफल! अब आप फॉर्म जमा कर सकते हैं।");
        submitBtn.disabled = false;
        document.getElementById('otpVerifySection').innerHTML = '<b class="text-success"><i class="fas fa-check-circle"></i> ईमेल सत्यापित है!</b>';
    } else {
        alert("गलत OTP! कृपया सही कोड डालें।");
    }
}