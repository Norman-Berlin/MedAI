// ============================================
// MEDAI MEDICAL ASSESSMENT ENGINE
// Version 2 - NLP + Conversational Assessment
// ============================================


// ============================================
// DOM ELEMENTS
// ============================================

const chatForm = document.getElementById("chatForm");
const messageInput = document.getElementById("messageInput");
const chatMessages = document.getElementById("chatMessages");
const typingIndicator = document.getElementById("typingIndicator");
const sendBtn = document.getElementById("sendBtn");
const newChatBtn = document.getElementById("newChatBtn");
const quickSuggestions = document.getElementById("quickSuggestions");


// ============================================
// SESSION MANAGEMENT
// ============================================

let sessionId = sessionStorage.getItem("medai_session_id");

if (!sessionId) {

    sessionId =
        "session_" +
        Date.now() +
        "_" +
        Math.random()
            .toString(36)
            .substring(2, 9);

    sessionStorage.setItem(
        "medai_session_id",
        sessionId
    );
}


// ============================================
// ASSESSMENT STATE
// ============================================

let assessment = {

    active: false,

    currentSymptom: null,

    currentQuestionIndex: 0,

    answers: {},

    symptoms: [],

    bodyLocations: [],

    duration: null,

    frequency: null,

    severity: null,

    triggers: [],

    negatedSymptoms: [],

    conditionsMentioned: [],

    medicalData: null,

    completed: false

};


// ============================================
// EXISTING QUESTION DATABASE
// ============================================
// These questions are retained for common symptoms.
// NLP can detect many more symptoms.
// For symptoms without a dedicated question set,
// MedAI will use general medical clarification questions.

const symptomDatabase = {

    headache: {

        name: "Headache",

        questions: [

            {
                key: "duration",
                question:
                    "How long have you been experiencing the headache?"
            },

            {
                key: "severity",
                question:
                    "How would you describe the severity of the headache: mild, moderate, or severe?"
            },

            {
                key: "location",
                question:
                    "Where do you feel the headache most strongly?"
            },

            {
                key: "associatedSymptoms",
                question:
                    "Are you experiencing any other symptoms such as nausea, vomiting, fever, vision changes, or sensitivity to light?"
            }

        ]

    },


    fever: {

        name: "Fever",

        questions: [

            {
                key: "duration",
                question:
                    "How long have you been experiencing the fever?"
            },

            {
                key: "temperature",
                question:
                    "If you have measured your temperature, what was the highest reading?"
            },

            {
                key: "associatedSymptoms",
                question:
                    "Do you have any other symptoms such as headache, cough, sore throat, vomiting, diarrhea, or body aches?"
            },

            {
                key: "hydration",
                question:
                    "Have you been able to drink fluids normally?"
            }

        ]

    },


    cough: {

        name: "Cough",

        questions: [

            {
                key: "duration",
                question:
                    "How long have you been coughing?"
            },

            {
                key: "type",
                question:
                    "Is the cough mostly dry, or are you bringing up mucus?"
            },

            {
                key: "associatedSymptoms",
                question:
                    "Do you have any other symptoms such as fever, sore throat, chest discomfort, or a runny nose?"
            },

            {
                key: "breathing",
                question:
                    "Have you experienced any difficulty breathing?"
            }

        ]

    },


    stomachPain: {

        name: "Stomach pain",

        questions: [

            {
                key: "duration",
                question:
                    "How long have you been experiencing the stomach pain?"
            },

            {
                key: "location",
                question:
                    "Where exactly in your abdomen do you feel the pain?"
            },

            {
                key: "severity",
                question:
                    "How would you describe the pain: mild, moderate, or severe?"
            },

            {
                key: "associatedSymptoms",
                question:
                    "Do you have symptoms such as nausea, vomiting, diarrhea, constipation, or fever?"
            }

        ]

    },


    nausea: {

        name: "Nausea",

        questions: [

            {
                key: "duration",
                question:
                    "How long have you been feeling nauseous?"
            },

            {
                key: "vomiting",
                question:
                    "Have you actually vomited?"
            },

            {
                key: "associatedSymptoms",
                question:
                    "Are you experiencing any other symptoms such as stomach pain, fever, headache, or diarrhea?"
            },

            {
                key: "hydration",
                question:
                    "Are you able to keep fluids down normally?"
            }

        ]

    },


    soreThroat: {

        name: "Sore throat",

        questions: [

            {
                key: "duration",
                question:
                    "How long have you had the sore throat?"
            },

            {
                key: "severity",
                question:
                    "How severe is the throat pain: mild, moderate, or severe?"
            },

            {
                key: "associatedSymptoms",
                question:
                    "Do you also have a cough, fever, runny nose, or swollen glands?"
            },

            {
                key: "swallowing",
                question:
                    "Are you having difficulty swallowing?"
            }

        ]

    },


    diarrhea: {

        name: "Diarrhea",

        questions: [

            {
                key: "duration",
                question:
                    "How long have you been experiencing diarrhea?"
            },

            {
                key: "frequency",
                question:
                    "Approximately how many times have you had loose or watery stools today?"
            },

            {
                key: "associatedSymptoms",
                question:
                    "Do you also have stomach pain, vomiting, fever, or blood in your stool?"
            },

            {
                key: "hydration",
                question:
                    "Are you able to drink fluids normally?"
            }

        ]

    },
    skinChanges: {

    name: "Skin changes",

    questions: [

        {
            key: "skinLocation",

            question:
                "Where on your body are the skin changes located?"
        },

        {
            key: "skinDuration",

            question:
                "How long have you noticed these skin changes?"
        },

        {
            key: "skinAppearance",

            question:
                "How would you describe the skin change? For example, is it dry, scaly, itchy, red, darker or lighter than the surrounding skin, or does it have a rash?"
        },

        {
            key: "skinTriggers",

            question:
                "Have you noticed anything that makes the skin change better or worse, such as sweating, heat, a new soap, detergent, cream, or other product?"
        }

    ]

},

};


// ============================================
// RED FLAG KEYWORDS
// ============================================

const redFlags = [

    "difficulty breathing",
    "cannot breathe",
    "can't breathe",
    "severe breathing",

    "chest pain",

    "unconscious",
    "passed out",
    "fainted",

    "severe bleeding",

    "vomiting blood",
    "blood in vomit",

    "blood in stool",

    "seizure",
    "convulsion",

    "sudden severe headache",
    "worst headache",

    "confusion",

    "cannot speak",
    "can't speak",

    "weakness on one side"

];


// ============================================
// CHAT FORM
// ============================================

if (chatForm) {

    chatForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const message =
                messageInput.value.trim();

            if (!message) {
                return;
            }

            processUserMessage(message);

        }
    );

}


// ============================================
// PROCESS USER MESSAGE
// ============================================

function processUserMessage(message) {

    addUserMessage(message);

    messageInput.value = "";

    autoResizeTextarea();

    if (quickSuggestions) {
        quickSuggestions.style.display = "none";
    }


    // ----------------------------------------
    // 1. CHECK SAFETY FIRST
    // ----------------------------------------

    if (containsRedFlag(message)) {

        showTyping();

        setTimeout(() => {

            hideTyping();

            showSafetyAlert();

        }, 700);

        return;
    }


    // ----------------------------------------
    // 2. ANALYZE MESSAGE USING MEDICAL NLP
    // ----------------------------------------

    const medicalData =
        analyzeMessageWithNLP(message);


    // ----------------------------------------
    // 3. DETECT CONVERSATIONAL INTENT
    // ----------------------------------------

    const intent =
        detectConversationIntent(message);


    // ----------------------------------------
    // 4. IF AN ASSESSMENT IS ALREADY ACTIVE
    // ----------------------------------------

    if (assessment.active) {

        saveCurrentAnswer(
            message,
            medicalData
        );

        mergeMedicalData(
            medicalData
        );

        moveToNextQuestion();

        return;
    }


    // ----------------------------------------
    // 5. MEDICAL MESSAGE
    // ----------------------------------------

    if (
        medicalData.isMedical ||
        medicalData.symptoms.length > 0 ||
        medicalData.bodyLocations.length > 0
    ) {

        startAssessment(
            message,
            intent,
            medicalData.symptoms,
            medicalData
        );

        return;
    }


    // ----------------------------------------
    // 6. NON-MEDICAL CONVERSATION
    // ----------------------------------------

    handleNonMedicalMessage(
        message,
        intent
    );

}


// ============================================
// MEDICAL NLP CONNECTION
// ============================================

function analyzeMessageWithNLP(message) {

    try {

        if (
            window.MedAINLP &&
            typeof window.MedAINLP.analyzeMedicalMessage === "function"
        ) {

            return window.MedAINLP.analyzeMedicalMessage(
                message
            );

        }


        if (
            typeof analyzeMedicalMessage === "function"
        ) {

            return analyzeMedicalMessage(
                message
            );

        }

    } catch (error) {

        console.error(
            "Medical NLP error:",
            error
        );

    }


    // Safe fallback

    return {

        isMedical: false,

        intent: "unknown",

        rawText: message,

        normalizedText:
            message.toLowerCase(),

        symptoms: [],

        symptomDetails: [],

        bodyLocations: [],

        conditionsMentioned: [],

        negatedSymptoms: [],

        uncertain: false,

        duration: null,

        frequency: null,

        severity: null,

        triggers: [],

        redFlags: [],

        confidence: 0

    };

}


// ============================================
// CONVERSATION INTENT
// ============================================

function detectConversationIntent(message) {

    const text =
        message
            .toLowerCase()
            .trim();


    // Greeting

    if (
        /^(hi|hello|hey|good morning|good afternoon|good evening)\b/
            .test(text)
    ) {

        return "greeting";

    }


    // Thanks

    if (
        /\b(thank you|thanks|appreciate it)\b/
            .test(text)
    ) {

        return "thanks";

    }


    // Goodbye

    if (
        /\b(bye|goodbye|see you|talk later)\b/
            .test(text)
    ) {

        return "goodbye";

    }


    // Help

    if (
        /\b(help me|can you help|what can you do)\b/
            .test(text)
    ) {

        return "help";

    }


    return "medical";


}


// ============================================
// START ASSESSMENT
// ============================================

function startAssessment(
    message,
    intent,
    detectedSymptoms,
    medicalData
) {

    assessment = {

        active: true,

        currentSymptom:
            detectedSymptoms.length > 0
                ? detectedSymptoms[0]
                : null,

        currentQuestionIndex: 0,

        answers: {},

        symptoms:
            detectedSymptoms || [],

        bodyLocations:
            medicalData.bodyLocations || [],

        duration:
            medicalData.duration || null,

        frequency:
            medicalData.frequency || null,

        severity:
            medicalData.severity || null,

        triggers:
            medicalData.triggers || [],

        negatedSymptoms:
            medicalData.negatedSymptoms || [],

        conditionsMentioned:
            medicalData.conditionsMentioned || [],

        medicalData: medicalData,

        completed: false

    };


    showTyping();


    setTimeout(() => {

        hideTyping();


        const acknowledgement =
            buildAssessmentAcknowledgement(
                medicalData
            );


        addAssistantMessage(
            acknowledgement
        );


        setTimeout(() => {

            askNextQuestion();

        }, 700);

    }, 700);

}


// ============================================
// BUILD ASSESSMENT ACKNOWLEDGEMENT
// ============================================

function buildAssessmentAcknowledgement(
    medicalData
) {

    const symptoms =
        medicalData.symptoms || [];


    if (symptoms.length === 1) {

        const readable =
            getReadableSymptomName(
                symptoms[0]
            );

        return (
            `I understand. You've described ${readable.toLowerCase()}. ` +
            `I'll ask you a few questions to better understand what you're experiencing.`
        );

    }


    if (symptoms.length > 1) {

        const readableSymptoms =
            symptoms
                .map(getReadableSymptomName)
                .join(", ");


        return (
            `I understand. You've described ${readableSymptoms.toLowerCase()}. ` +
            `I'll ask a few questions so I can organize the information clearly.`
        );

    }


    if (
        medicalData.bodyLocations &&
        medicalData.bodyLocations.length > 0
    ) {

        return (
            "I understand. You've described a health concern " +
            "in a specific area. I'll ask a few questions to understand it better."
        );

    }


    return (
        "I understand. I'll ask a few questions to better understand " +
        "what you're experiencing."
    );

}


// ============================================
// ASK NEXT QUESTION
// ============================================

function askNextQuestion() {

    const symptomKey =
        assessment.currentSymptom;


    const symptom =
        symptomDatabase[symptomKey];


    // ----------------------------------------
    // COMMON SYMPTOM WITH DEDICATED QUESTIONS
    // ----------------------------------------

    if (symptom) {

        const question =
            symptom.questions[
                assessment.currentQuestionIndex
            ];


        if (!question) {

            // If another symptom was detected,
            // move to it before finishing.

            const nextSymptomIndex =
                assessment.symptoms.indexOf(
                    symptomKey
                ) + 1;


            if (
                nextSymptomIndex <
                assessment.symptoms.length
            ) {

                assessment.currentSymptom =
                    assessment.symptoms[
                        nextSymptomIndex
                    ];

                assessment.currentQuestionIndex =
                    0;

                askNextQuestion();

                return;

            }


            finishAssessment();

            return;
        }


        showTyping();


        setTimeout(() => {

            hideTyping();

            addAssistantMessage(
                question.question
            );

        }, 600);

        return;
    }


    // ----------------------------------------
    // NEW/NLP SYMPTOM WITHOUT FIXED QUESTIONS
    // ----------------------------------------

    askGeneralMedicalQuestion();

}


// ============================================
// GENERAL MEDICAL QUESTION
// ============================================
// ============================================
// GENERAL MEDICAL QUESTIONS
// ============================================

const generalMedicalQuestions = [

    {
        key: "generalLocation",

        question:
            "Where exactly are you experiencing this problem?"
    },

    {
        key: "generalDuration",

        question:
            "How long have you been experiencing this?"
    },

    {
        key: "generalProgress",

        question:
            "Has it been getting better, getting worse, or staying about the same?"
    },

    {
        key: "generalFeatures",

        question:
            "What does it feel or look like, and have you noticed anything else along with it?"
    }

];


function askGeneralMedicalQuestion() {

    const question =
        generalMedicalQuestions[
            assessment.currentQuestionIndex %
            generalMedicalQuestions.length
        ];


    showTyping();


    setTimeout(() => {

        hideTyping();

        addAssistantMessage(
            question.question
        );

    }, 600);

}
// ============================================
// SAVE CURRENT ANSWER
// ============================================

function saveCurrentAnswer(
    message,
    medicalData
) {

    const symptom =
        symptomDatabase[
            assessment.currentSymptom
        ];


    if (symptom) {

        const question =
            symptom.questions[
                assessment.currentQuestionIndex
            ];


        if (question) {

            assessment.answers[
                question.key
            ] = message;

        }

    } else {

        const key =
            `general_${assessment.currentQuestionIndex}`;

        assessment.answers[key] =
            message;

    }


    // Analyze the answer as well.

    if (!medicalData) {

        medicalData =
            analyzeMessageWithNLP(
                message
            );

    }


    mergeMedicalData(
        medicalData
    );

}


// ============================================
// MERGE MEDICAL NLP DATA
// ============================================

function mergeMedicalData(
    medicalData
) {

    if (!medicalData) {
        return;
    }


    assessment.medicalData =
        medicalData;


    // Symptoms

    assessment.symptoms =
        uniqueValues(
            assessment.symptoms.concat(
                medicalData.symptoms || []
            )
        );


    // Body locations

    assessment.bodyLocations =
        uniqueValues(
            assessment.bodyLocations.concat(
                medicalData.bodyLocations || []
            )
        );


    // Triggers

    assessment.triggers =
        uniqueValues(
            assessment.triggers.concat(
                medicalData.triggers || []
            )
        );


    // Negated symptoms

    assessment.negatedSymptoms =
        uniqueValues(
            assessment.negatedSymptoms.concat(
                medicalData.negatedSymptoms || []
            )
        );


    // Conditions mentioned

    assessment.conditionsMentioned =
        uniqueValues(
            assessment.conditionsMentioned.concat(
                medicalData.conditionsMentioned || []
            )
        );


    // Structured details

    if (medicalData.duration) {

        assessment.duration =
            medicalData.duration;

    }


    if (medicalData.frequency) {

        assessment.frequency =
            medicalData.frequency;

    }


    if (medicalData.severity) {

        assessment.severity =
            medicalData.severity;

    }

}


// ============================================
// UNIQUE ARRAY VALUES
// ============================================

function uniqueValues(values) {

    return [
        ...new Set(
            values.filter(Boolean)
        )
    ];

}


// ============================================
// MOVE TO NEXT QUESTION
// ============================================

function moveToNextQuestion() {

    assessment.currentQuestionIndex++;

    askNextQuestion();

}


// ============================================
// FINISH ASSESSMENT
// ============================================
// ============================================
// FINISH ASSESSMENT
// ============================================

function finishAssessment() {

    assessment.completed = true;

    assessment.active = false;


    showTyping();


    setTimeout(() => {

        hideTyping();


        addAssistantMessage(
            "Thank you. I now have enough information to perform an initial assessment of the symptoms you've described."
        );


        setTimeout(() => {

            addAssessmentSummary();

        }, 700);


        setTimeout(() => {

            runKnowledgeAssessment();

        }, 1600);

    }, 700);

}

// ============================================
// ASSESSMENT SUMMARY
// ============================================

// ============================================
// RUN MEDICAL KNOWLEDGE ASSESSMENT
// ============================================

function runKnowledgeAssessment() {

    // Make sure the knowledge base is available
    if (
        !window.MedAIKnowledge ||
        typeof window.MedAIKnowledge.buildPossibleConditionResponse !== "function"
    ) {

        console.error(
            "MedAI Knowledge Base is not available."
        );

        addAssistantMessage(
            "I have collected the information, but the medical knowledge assessment is currently unavailable."
        );

        return;
    }


    // Build the structured medical data
    const medicalData = {

        symptoms:
            assessment.symptoms || [],

        bodyLocations:
            assessment.bodyLocations || [],

        duration:
            assessment.duration || null,

        frequency:
            assessment.frequency || null,

        severity:
            assessment.severity || null,

        triggers:
            assessment.triggers || [],

        negatedSymptoms:
            assessment.negatedSymptoms || [],

        conditionsMentioned:
            assessment.conditionsMentioned || [],

        symptomDetails:
            assessment.medicalData?.symptomDetails || [],

        rawText:
            assessment.medicalData?.rawText || "",

        normalizedText:
            assessment.medicalData?.normalizedText || ""

    };


    // Ask the knowledge base for possible conditions
    const result =
        window.MedAIKnowledge.buildPossibleConditionResponse(
            medicalData
        );


    showTyping();


    setTimeout(() => {

        hideTyping();

        displayPossibleConditions(
            result
        );

    }, 900);

}

function addAssessmentSummary() {

    const symptoms =
        assessment.symptoms || [];


    const locations =
        assessment.bodyLocations || [];


    const symptomText =
        symptoms.length > 0
            ? symptoms
                .map(getReadableSymptomName)
                .join(", ")
            : "Health concern described";


    const locationText =
        locations.length > 0
            ? locations
                .map(
                    getReadableLocationName
                )
                .join(", ")
            : "Not specified";


    const durationText =
        assessment.duration ||
        "Not specified";


    const severityText =
        assessment.severity ||
        "Not specified";


    const summaryHTML = `

        <div class="assessment-summary">

            <div class="summary-header">

                <i class="fa-solid fa-clipboard-check"></i>

                <strong>
                    Assessment Information Collected
                </strong>

            </div>


            <div class="summary-item">

                <span>Reported symptoms</span>

                <strong>
                    ${escapeHTML(symptomText)}
                </strong>

            </div>


            <div class="summary-item">

                <span>Body area</span>

                <strong>
                    ${escapeHTML(locationText)}
                </strong>

            </div>


            <div class="summary-item">

                <span>Duration</span>

                <strong>
                    ${escapeHTML(
                        String(durationText)
                    )}
                </strong>

            </div>


            <div class="summary-item">

                <span>Severity</span>

                <strong>
                    ${escapeHTML(
                        String(severityText)
                    )}
                </strong>

            </div>


            <div class="summary-item">

                <span>Information provided</span>

                <strong>
                    ${Object.keys(
                        assessment.answers
                    ).length} responses
                </strong>

            </div>


            <div class="summary-note">

                This information can be compared with
                MedAI's medical knowledge base to identify
                possible conditions and appropriate
                general guidance.

                MedAI does not provide a definitive diagnosis.

            </div>

        </div>

    `;


    const row =
        document.createElement(
            "div"
        );


    row.className =
        "message-row assistant-row";


    row.innerHTML = `

        <div class="message-avatar">

            <i class="fa-solid fa-robot"></i>

        </div>


        <div class="message-content">

            <div class="message assistant-message">

                ${summaryHTML}

            </div>

        </div>

    `;


    chatMessages.appendChild(row);


    scrollToBottom();


    setTimeout(() => {

        addAssistantMessage(
            "The next stage is to compare the collected information with the medical knowledge base and present possible conditions to consider, together with general guidance and safety information."
        );

    }, 1000);

}


// ============================================
// DISPLAY POSSIBLE CONDITIONS
// ============================================

function displayPossibleConditions(result) {

    if (!result) {

        addAssistantMessage(
            "I could not complete the condition comparison with the information provided."
        );

        return;

    }


    // ----------------------------------------
    // NO STRONG MATCH
    // ----------------------------------------

    if (
        !result.found ||
        !result.possibilities ||
        result.possibilities.length === 0
    ) {

        addAssistantMessage(
            "The information you've provided does not currently match a strong pattern in my medical knowledge base. This does not mean that nothing is wrong. A healthcare professional can assess symptoms that remain unexplained."
        );

        return;

    }


    // ----------------------------------------
    // INTRODUCTION
    // ----------------------------------------

    addAssistantMessage(
        "Based on the information you've provided, here are some possible conditions to consider. These are possibilities, not a definitive diagnosis."
    );


    setTimeout(() => {

        result.possibilities.forEach(
            (condition, index) => {

                setTimeout(() => {

                    displayConditionCard(
                        condition,
                        index
                    );

                }, index * 700);

            }
        );


        // Guidance after all conditions
        setTimeout(() => {

            displayGeneralAssessmentGuidance(
                result.possibilities
            );

        }, result.possibilities.length * 700 + 800);

    }, 500);

}


// ============================================
// DISPLAY CONDITION CARD
// ============================================

function displayConditionCard(
    condition,
    index
) {

    const row =
        document.createElement(
            "div"
        );


    row.className =
        "message-row assistant-row";


    const matchedSymptoms =
        condition.matchedSymptoms || [];


    const matchedLocations =
        condition.matchedLocations || [];


    const matchedFeatures =
        condition.matchedFeatures || [];


    const evidence = [];


    matchedSymptoms.forEach(
        symptom => {

            evidence.push(
                getReadableSymptomName(
                    symptom
                )
            );

        }
    );


    matchedLocations.forEach(
        location => {

            evidence.push(
                getReadableLocationName(
                    location
                )
            );

        }
    );


    matchedFeatures.forEach(
        feature => {

            evidence.push(
                formatMedicalTerm(
                    feature
                )
            );

        }
    );


    const evidenceHTML =
        evidence.length > 0

            ? evidence
                .slice(0, 6)
                .map(
                    item =>
                        `<li>${escapeHTML(item)}</li>`
                )
                .join("")

            : "<li>Pattern of reported symptoms</li>";


    const urgencyText =
        getUrgencyText(
            condition.urgency
        );


    row.innerHTML = `

        <div class="message-avatar">

            <i class="fa-solid fa-robot"></i>

        </div>


        <div class="message-content">

            <div class="message assistant-message">

                <div class="condition-card">

                    <div class="condition-header">

                        <span class="condition-number">

                            ${index + 1}

                        </span>


                        <strong>

                            ${escapeHTML(
                                condition.name
                            )}

                        </strong>

                    </div>


                    <div class="condition-category">

                        ${escapeHTML(
                            condition.category
                        )}

                    </div>


                    <p class="condition-description">

                        ${escapeHTML(
                            condition.description
                        )}

                    </p>


                    <div class="condition-section">

                        <strong>
                            Why it was considered
                        </strong>


                        <ul>

                            ${evidenceHTML}

                        </ul>

                    </div>


                    <div class="condition-section">

                        <strong>
                            General guidance
                        </strong>


                        <p>

                            ${escapeHTML(
                                condition.guidance
                            )}

                        </p>

                    </div>


                    <div class="condition-urgency">

                        <strong>
                            General priority:
                        </strong>

                        ${escapeHTML(
                            urgencyText
                        )}

                    </div>


                    <div class="condition-disclaimer">

                        This is only a possible condition
                        based on symptom overlap. It is not
                        a medical diagnosis.

                    </div>

                </div>

            </div>


            <span class="message-time">

                Just now

            </span>

        </div>

    `;


    chatMessages.appendChild(row);


    scrollToBottom();

}


// ============================================
// URGENCY TEXT
// ============================================

function getUrgencyText(
    urgency
) {

    switch (
        String(urgency || "").toLowerCase()
    ) {

        case "routine":

            return "Routine medical review if symptoms persist or worsen.";

        case "moderate":

            return "Consider medical assessment, especially if symptoms persist or worsen.";

        case "urgent":

            return "Prompt medical assessment is recommended.";

        default:

            return "Seek professional medical advice if concerned.";

    }

}


// ============================================
// FORMAT MEDICAL TERM
// ============================================

function formatMedicalTerm(
    term
) {

    if (!term) {
        return "";
    }


    return String(term)

        .replace(
            /([A-Z])/g,
            " $1"
        )

        .replace(
            /^./,
            character =>
                character.toUpperCase()
        );

}


// ============================================
// GENERAL ASSESSMENT GUIDANCE
// ============================================

function displayGeneralAssessmentGuidance(
    possibilities
) {

    const highestUrgency =
        getHighestUrgency(
            possibilities
        );


    let message =
        "These results are based only on the information you've provided. Several different conditions can produce similar symptoms, so they should not be treated as a confirmed diagnosis.";


    if (
        highestUrgency === "moderate"
    ) {

        message +=
            " Because some of the possible patterns may require medical assessment, consider speaking with a qualified healthcare professional, particularly if the symptoms persist, worsen, or become concerning.";

    }


    message +=
        " If you develop a serious warning sign such as significant difficulty breathing, loss of consciousness, severe bleeding, or another emergency symptom, seek urgent medical care.";


    addAssistantMessage(
        message
    );

}


// ============================================
// GET HIGHEST URGENCY
// ============================================

function getHighestUrgency(
    possibilities
) {

    const priority = {

        urgent: 3,

        moderate: 2,

        routine: 1

    };


    let highest =
        "routine";


    possibilities.forEach(
        condition => {

            const urgency =
                condition.urgency ||
                "routine";


            if (
                priority[urgency] >
                priority[highest]
            ) {

                highest =
                    urgency;

            }

        }
    );


    return highest;

}

// ============================================
// READABLE SYMPTOM NAMES
// ============================================

function getReadableSymptomName(
    symptom
) {

    const names = {

        headache: "Headache",

        migraine: "Migraine-like symptoms",

        fever: "Fever",

        cough: "Cough",

        stomachPain: "Stomach pain",

        abdominalPain: "Abdominal pain",

        nausea: "Nausea",

        vomiting: "Vomiting",

        soreThroat: "Sore throat",

        diarrhea: "Diarrhea",

        constipation: "Constipation",

        bodyPain: "Body pain",

        chestPain: "Chest pain",

        backPain: "Back pain",

        jointPain: "Joint pain",

        dizziness: "Dizziness",

        fatigue: "Fatigue",

        weakness: "Weakness",

        shortnessOfBreath:
            "Shortness of breath",

        wheezing: "Wheezing",

        runnyNose: "Runny nose",

        blockedNose: "Blocked nose",

        sneezing: "Sneezing",

        chills: "Chills",

        lossOfAppetite:
            "Loss of appetite",

        bloating: "Bloating",

        skinChanges: "Skin changes",

        skinDryness: "Dry skin",

        skinScaling: "Skin scaling",

        skinRash: "Skin rash",

        skinRedness: "Skin redness",

        itching: "Itching",

        swelling: "Swelling",

        painfulUrination:
            "Painful urination",

        frequentUrination:
            "Frequent urination",

        bloodInUrine:
            "Blood in urine",

        numbness: "Numbness",

        tingling: "Tingling",

        fainting: "Fainting",

        eyePain: "Eye pain",

        blurredVision:
            "Blurred vision",

        eyeRedness:
            "Eye redness",

        toothPain:
            "Tooth pain"

    };


    if (names[symptom]) {

        return names[symptom];

    }


    // Convert camelCase to normal text

    return String(symptom)
        .replace(
            /([A-Z])/g,
            " $1"
        )
        .replace(
            /^./,
            character =>
                character.toUpperCase()
        );

}


// ============================================
// READABLE BODY LOCATIONS
// ============================================

function getReadableLocationName(
    location
) {

    const names = {

        head: "Head",

        neck: "Neck",

        chest: "Chest",

        abdomen: "Abdomen",

        back: "Back",

        arm: "Arm",

        hand: "Hand",

        leg: "Leg",

        foot: "Foot",

        groin: "Groin",

        genitalArea:
            "Genital area",

        skin: "Skin",

        eye: "Eye",

        mouth: "Mouth",

        throat: "Throat"

    };


    return (
        names[location] ||
        String(location)
            .replace(
                /([A-Z])/g,
                " $1"
            )
    );

}


// ============================================
// COMPATIBILITY DETECT SYMPTOMS FUNCTION
// ============================================
// Other parts of the project can still call
// detectSymptoms(message).

function detectSymptoms(message) {

    const medicalData =
        analyzeMessageWithNLP(
            message
        );


    return medicalData.symptoms || [];

}


// ============================================
// RED FLAG DETECTION
// ============================================

function containsRedFlag(message) {

    const text =
        message.toLowerCase();


    // Existing keyword-based safety layer

    const keywordMatch =
        redFlags.some(
            flag =>
                text.includes(flag)
        );


    if (keywordMatch) {

        return true;

    }


    // Also check NLP red flags if available.

    try {

        const medicalData =
            analyzeMessageWithNLP(
                message
            );


        if (
            medicalData.redFlags &&
            medicalData.redFlags.length > 0
        ) {

            return true;

        }

    } catch (error) {

        console.warn(
            "NLP red flag check failed:",
            error
        );

    }


    return false;

}


// ============================================
// SAFETY ALERT
// ============================================

function showSafetyAlert() {

    const row =
        document.createElement(
            "div"
        );


    row.className =
        "message-row assistant-row";


    row.innerHTML = `

        <div class="message-avatar safety-avatar">

            <i class="fa-solid fa-triangle-exclamation"></i>

        </div>


        <div class="message-content">

            <div class="message safety-message">

                <h5>
                    Potential warning sign detected
                </h5>


                <p>

                    The information you've entered
                    may indicate a situation that
                    should be assessed by a qualified
                    healthcare professional promptly.

                </p>


                <p>

                    Please seek appropriate medical care.
                    If this appears to be an emergency,
                    contact your local emergency service
                    or go to the nearest emergency facility.

                </p>


                <strong>

                    MedAI cannot determine whether
                    a medical emergency is occurring.

                </strong>

            </div>

        </div>

    `;


    chatMessages.appendChild(row);


    scrollToBottom();

}


// ============================================
// NON-MEDICAL MESSAGE HANDLER
// ============================================

function handleNonMedicalMessage(
    message,
    intent
) {

    showTyping();


    setTimeout(() => {

        hideTyping();


        if (intent === "greeting") {

            addAssistantMessage(
                "Hello. I'm MedAI, your AI medical assessment assistant. Tell me what health concern or symptoms you'd like help understanding."
            );

            return;
        }


        if (intent === "thanks") {

            addAssistantMessage(
                "You're welcome. I'm here to help you understand the health information you provide."
            );

            return;
        }


        if (intent === "goodbye") {

            addAssistantMessage(
                "Take care. You can start a new assessment whenever you need help understanding a health concern."
            );

            return;
        }


        if (intent === "help") {

            addAssistantMessage(
                "I can help you describe your symptoms, ask follow-up questions, organize the information you provide, and identify possible conditions to consider. I cannot provide a definitive diagnosis."
            );

            return;
        }


        addAssistantMessage(
            "I'd be happy to help with a health concern. Please describe what you're experiencing, where it is, and anything else you've noticed."
        );

    }, 500);

}


// ============================================
// ADD USER MESSAGE
// ============================================

function addUserMessage(message) {

    const row =
        document.createElement(
            "div"
        );


    row.className =
        "message-row user-row";


    row.innerHTML = `

        <div class="message-content">

            <div class="message user-message">

                ${escapeHTML(message)}

            </div>


            <span class="message-time">
                Just now
            </span>

        </div>


        <div class="message-avatar">

            <i class="fa-solid fa-user"></i>

        </div>

    `;


    chatMessages.appendChild(row);


    scrollToBottom();

}


// ============================================
// ADD ASSISTANT MESSAGE
// ============================================

function addAssistantMessage(message) {

    const row =
        document.createElement(
            "div"
        );


    row.className =
        "message-row assistant-row";


    row.innerHTML = `

        <div class="message-avatar">

            <i class="fa-solid fa-robot"></i>

        </div>


        <div class="message-content">

            <div class="message assistant-message">

                <p>
                    ${escapeHTML(message)}
                </p>

            </div>


            <span class="message-time">
                Just now
            </span>

        </div>

    `;


    chatMessages.appendChild(row);


    scrollToBottom();

}


// ============================================
// TYPING INDICATOR
// ============================================

function showTyping() {

    if (!typingIndicator) {
        return;
    }


    typingIndicator.style.display =
        "flex";


    scrollToBottom();

}


function hideTyping() {

    if (!typingIndicator) {
        return;
    }


    typingIndicator.style.display =
        "none";

}


// ============================================
// SCROLL CHAT TO BOTTOM
// ============================================

function scrollToBottom() {

    if (!chatMessages) {
        return;
    }


    chatMessages.scrollTop =
        chatMessages.scrollHeight;

}


// ============================================
// TEXTAREA AUTO RESIZE
// ============================================

function autoResizeTextarea() {

    if (!messageInput) {
        return;
    }


    messageInput.style.height =
        "auto";


    messageInput.style.height =
        messageInput.scrollHeight +
        "px";

}


if (messageInput) {

    messageInput.addEventListener(
        "input",
        autoResizeTextarea
    );

}


// ============================================
// QUICK SUGGESTIONS
// ============================================

if (quickSuggestions) {

    quickSuggestions.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest(
                    "[data-message]"
                );


            if (!button) {
                return;
            }


            const message =
                button.dataset.message;


            if (!message) {
                return;
            }


            processUserMessage(
                message
            );

        }
    );

}


// ============================================
// NEW CHAT
// ============================================

if (newChatBtn) {

    newChatBtn.addEventListener(
        "click",
        function () {

            assessment = {

                active: false,

                currentSymptom: null,

                currentQuestionIndex: 0,

                answers: {},

                symptoms: [],

                bodyLocations: [],

                duration: null,

                frequency: null,

                severity: null,

                triggers: [],

                negatedSymptoms: [],

                conditionsMentioned: [],

                medicalData: null,

                completed: false

            };


            chatMessages.innerHTML = "";


            if (quickSuggestions) {

                quickSuggestions.style.display =
                    "flex";

            }


            addAssistantMessage(
                "Hello. I'm MedAI. Tell me what health concern you'd like help understanding."
            );

        }
    );

}


// ============================================
// ENTER KEY HANDLING
// ============================================

if (messageInput) {

    messageInput.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter" &&
                !event.shiftKey
            ) {

                event.preventDefault();


                if (chatForm) {

                    chatForm.requestSubmit();

                }

            }

        }
    );

}


// ============================================
// ESCAPE HTML
// ============================================

function escapeHTML(value) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        String(value);


    return div.innerHTML;

}


// ============================================
// INITIALIZE CHAT
// ============================================

if (
    chatMessages &&
    chatMessages.children.length === 0
) {

    addAssistantMessage(
        "Hello. I'm MedAI. Tell me what health concern you'd like help understanding."
    );

}