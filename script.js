// ==========================================
// APP PERMISSION RISK CHECKER
// FINAL VERSION
// ISCL MICROPROJECT
// ==========================================


// ==========================================
// DOM ELEMENTS
// ==========================================

const homePage =
    document.getElementById("homePage");

const resultPage =
    document.getElementById("resultPage");


const appName =
    document.getElementById("appName");

const appCategory =
    document.getElementById("appCategory");

const exampleApp =
    document.getElementById("exampleApp");


const permissions =
    document.querySelectorAll(".permission");


const permissionCount =
    document.getElementById("permissionCount");


const analyzeBtn =
    document.getElementById("analyzeBtn");

const resetBtn =
    document.getElementById("resetBtn");


const backBtn =
    document.getElementById("backBtn");

const newAnalysisBtn =
    document.getElementById("newAnalysisBtn");


const resultAppName =
    document.getElementById("resultAppName");

const resultCategory =
    document.getElementById("resultCategory");

const resultPermissionCount =
    document.getElementById("resultPermissionCount");


const scoreValue =
    document.getElementById("scoreValue");

const scoreCircle =
    document.getElementById("scoreCircle");


const riskLevel =
    document.getElementById("riskLevel");

const riskMessage =
    document.getElementById("riskMessage");


const selectedPermissions =
    document.getElementById("selectedPermissions");


const recommendations =
    document.getElementById("recommendations");


// ==========================================
// PERMISSION DATA
// ==========================================

const permissionData = {

    camera: {

        name: "Camera",

        icon: "📷",

        points: 1,

        recommendation:
            "Review whether camera access is necessary for the application's main features."

    },


    microphone: {

        name: "Microphone",

        icon: "🎤",

        points: 2,

        recommendation:
            "Allow microphone access only when audio recording, calling or voice features are required."

    },


    location: {

        name: "Location",

        icon: "📍",

        points: 2,

        recommendation:
            "Check whether location access is necessary and avoid continuous access when possible."

    },


    contacts: {

        name: "Contacts",

        icon: "👥",

        points: 2,

        recommendation:
            "Avoid contact access unless it is required for a clear application feature."

    },


    sms: {

        name: "SMS",

        icon: "💬",

        points: 3,

        recommendation:
            "Be careful with SMS access because messages may contain sensitive information and verification codes."

    },


    phone: {

        name: "Phone",

        icon: "📞",

        points: 2,

        recommendation:
            "Review whether phone access is actually required for the application's main function."

    },


    files: {

        name: "Files & Storage",

        icon: "📁",

        points: 1,

        recommendation:
            "Limit file access and avoid granting broad access when it is unnecessary."

    }

};


// ==========================================
// REFERENCE APP PROFILES
// ==========================================

const sampleApps = {

    whatsapp: {

        name: "WhatsApp",

        category: "Messaging",

        permissions: [
            "camera",
            "microphone",
            "contacts",
            "location"
        ]

    },


    instagram: {

        name: "Instagram",

        category: "Social Media",

        permissions: [
            "camera",
            "microphone",
            "location",
            "files"
        ]

    },


    facebook: {

        name: "Facebook",

        category: "Social Media",

        permissions: [
            "camera",
            "microphone",
            "contacts",
            "location"
        ]

    },


    snapchat: {

        name: "Snapchat",

        category: "Social Media",

        permissions: [
            "camera",
            "microphone",
            "location"
        ]

    },


    maps: {

        name: "Google Maps",

        category: "Navigation",

        permissions: [
            "location",
            "microphone"
        ]

    },


    photo: {

        name: "Photo Editor",

        category: "Photography",

        permissions: [
            "camera",
            "files"
        ]

    },


    messaging: {

        name: "Messaging App",

        category: "Messaging",

        permissions: [
            "microphone",
            "contacts",
            "phone"
        ]

    },


    shopping: {

        name: "Shopping App",

        category: "Shopping",

        permissions: [
            "location",
            "camera",
            "files"
        ]

    },


    game: {

        name: "Game",

        category: "Gaming",

        permissions: [
            "microphone",
            "files",
            "camera"
        ]

    }

};


// ==========================================
// UPDATE PERMISSION COUNT
// ==========================================

function updatePermissionCount() {

    const selected =
        document.querySelectorAll(
            ".permission:checked"
        );

    permissionCount.textContent =
        selected.length;
}


permissions.forEach(
    function (permission) {

        permission.addEventListener(
            "change",
            updatePermissionCount
        );

    }
);


// ==========================================
// LOAD REFERENCE APP
// ==========================================

exampleApp.addEventListener(
    "change",
    function () {

        const selectedExample =
            exampleApp.value;


        if (selectedExample === "") {

            return;

        }


        const sample =
            sampleApps[selectedExample];


        if (!sample) {

            return;

        }


        appName.value =
            sample.name;


        appCategory.value =
            sample.category;


        // Clear permissions

        permissions.forEach(
            function (permission) {

                permission.checked =
                    false;

            }
        );


        // Select reference permissions

        sample.permissions.forEach(
            function (permissionName) {

                const checkbox =
                    document.querySelector(
                        `.permission[value="${permissionName}"]`
                    );


                if (checkbox) {

                    checkbox.checked =
                        true;

                }

            }
        );


        updatePermissionCount();

    }
);


// ==========================================
// ANALYZE RISK
// ==========================================

analyzeBtn.addEventListener(
    "click",
    function () {


        const name =
            appName.value.trim();


        const category =
            appCategory.value;


        const selected =
            Array.from(
                document.querySelectorAll(
                    ".permission:checked"
                )
            );


        // ==================================
        // VALIDATION
        // ==================================

        if (name === "") {

            alert(
                "Please enter the app name."
            );

            appName.focus();

            return;

        }


        if (category === "") {

            alert(
                "Please select the app category."
            );

            appCategory.focus();

            return;

        }


        if (selected.length === 0) {

            alert(
                "Please select at least one permission."
            );

            return;

        }


        // ==================================
        // CALCULATE RAW SCORE
        // ==================================

        let rawScore = 0;


        selected.forEach(
            function (checkbox) {

                const data =
                    permissionData[
                        checkbox.value
                    ];


                if (data) {

                    rawScore +=
                        data.points;

                }

            }
        );


        // ==================================
        // CONVERT TO 10 POINT SCORE
        // ==================================

        const score =
            Math.round(
                (rawScore / 13) * 10
            );


        // ==================================
        // SHOW APP DETAILS
        // ==================================

        resultAppName.textContent =
            name;


        resultCategory.textContent =
            category;


        resultPermissionCount.textContent =
            selected.length;


        scoreValue.textContent =
            score;


        // ==================================
        // RISK CLASSIFICATION
        // ==================================

        let level;

        let message;


        if (score <= 3) {

            level =
                "LOW RISK 🟢";


            message =
                "The selected permissions indicate a relatively low privacy risk based on this project's educational scoring model.";


            scoreCircle.style.borderColor =
                "#39a96b";


            scoreValue.style.color =
                "#27824f";


            riskLevel.style.color =
                "#27824f";

        }


        else if (score <= 6) {

            level =
                "MEDIUM RISK 🟠";


            message =
                "Some selected permissions can access sensitive device features or personal information.";


            scoreCircle.style.borderColor =
                "#e3a72f";


            scoreValue.style.color =
                "#c27d00";


            riskLevel.style.color =
                "#c27d00";

        }


        else {

            level =
                "HIGH RISK 🔴";


            message =
                "Several sensitive permissions are selected. Review whether each permission is necessary.";


            scoreCircle.style.borderColor =
                "#d9534f";


            scoreValue.style.color =
                "#c0392b";


            riskLevel.style.color =
                "#c0392b";

        }


        riskLevel.textContent =
            level;


        riskMessage.textContent =
            message;


        // ==================================
        // SELECTED PERMISSION TAGS
        // ==================================

        selectedPermissions.innerHTML =
            "";


        selected.forEach(
            function (checkbox) {

                const data =
                    permissionData[
                        checkbox.value
                    ];


                if (data) {

                    const tag =
                        document.createElement(
                            "span"
                        );


                    tag.className =
                        "permission-tag";


                    tag.textContent =
                        `${data.icon} ${data.name}`;


                    selectedPermissions.appendChild(
                        tag
                    );

                }

            }
        );


        // ==================================
        // RECOMMENDATIONS
        // ==================================

        recommendations.innerHTML =
            "";


        // General recommendation

        const generalRecommendation =
            document.createElement("li");


        generalRecommendation.textContent =
            "Review every requested permission and allow only access that is necessary for the application's intended purpose.";


        recommendations.appendChild(
            generalRecommendation
        );


        // Permission-specific recommendations

        selected.forEach(
            function (checkbox) {

                const data =
                    permissionData[
                        checkbox.value
                    ];


                if (data) {

                    const item =
                        document.createElement(
                            "li"
                        );


                    item.textContent =
                        data.recommendation;


                    recommendations.appendChild(
                        item
                    );

                }

            }
        );


        // High-risk recommendation

        if (score >= 7) {

            const highRiskTip =
                document.createElement(
                    "li"
                );


            highRiskTip.textContent =
                "Consider denying unnecessary permissions and reviewing the application's privacy information before use.";


            recommendations.appendChild(
                highRiskTip
            );

        }


        // ==================================
        // SWITCH TO RESULT PAGE
        // ==================================

        homePage.classList.add(
            "hidden"
        );


        resultPage.classList.remove(
            "hidden"
        );


        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);


// ==========================================
// RESET
// ==========================================

function resetProject() {

    appName.value =
        "";


    appCategory.value =
        "";


    exampleApp.value =
        "";


    permissions.forEach(
        function (permission) {

            permission.checked =
                false;

        }
    );


    permissionCount.textContent =
        "0";


    resultAppName.textContent =
        "-";


    resultCategory.textContent =
        "-";


    resultPermissionCount.textContent =
        "0";


    scoreValue.textContent =
        "0";


    riskLevel.textContent =
        "-";


    riskMessage.textContent =
        "Analyze the selected permissions.";


    selectedPermissions.textContent =
        "No permissions selected.";


    recommendations.innerHTML =
        "<li>Review permissions before granting access.</li>";


    scoreCircle.style.borderColor =
        "#c9e7f7";


    scoreValue.style.color =
        "#0879c9";


    riskLevel.style.color =
        "#18324a";


    homePage.classList.remove(
        "hidden"
    );


    resultPage.classList.add(
        "hidden"
    );


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// ==========================================
// RESET BUTTON
// ==========================================

resetBtn.addEventListener(
    "click",
    resetProject
);


// ==========================================
// ANALYZE ANOTHER APP
// ==========================================

newAnalysisBtn.addEventListener(
    "click",
    resetProject
);


// ==========================================
// BACK TO ANALYSIS
// ==========================================

backBtn.addEventListener(
    "click",
    function () {

        homePage.classList.remove(
            "hidden"
        );

        resultPage.classList.add(
            "hidden"
        );

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);