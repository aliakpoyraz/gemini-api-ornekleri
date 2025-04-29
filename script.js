const GEMINI_API_KEY = 'API_KEY'; // API KEY BURAYA 
const API_ENDPOINT = '/api/generate';
function addEducationField() {
    const template = document.querySelector('.education-entry').cloneNode(true);
    template.querySelectorAll('input').forEach(input => input.value = '');
    
    // Silme butonu
    const deleteButton = document.createElement('div');
    deleteButton.className = 'd-flex justify-content-end mb-2';
    deleteButton.innerHTML = `
        <button type="button" class="btn btn-danger btn-sm" onclick="removeEducationField(this)">
            <i class="bi bi-trash"></i> Sil
        </button>
    `;
    template.insertBefore(deleteButton, template.firstChild);
    
    document.getElementById('educationFields').appendChild(template);
}

function addExperienceField() {
    const template = document.querySelector('.experience-entry').cloneNode(true);
    template.querySelectorAll('input').forEach(input => input.value = '');
    template.querySelector('textarea').value = '';
    

    const deleteButton = document.createElement('div');
    deleteButton.className = 'd-flex justify-content-end mb-2';
    deleteButton.innerHTML = `
        <button type="button" class="btn btn-danger btn-sm" onclick="removeExperienceField(this)">
            <i class="bi bi-trash"></i> Sil
        </button>
    `;
    template.insertBefore(deleteButton, template.firstChild);
    
    document.getElementById('experienceFields').appendChild(template);
}

function addCertificateField() {
    const template = document.querySelector('.certificate-entry').cloneNode(true);
    template.querySelectorAll('input').forEach(input => input.value = '');
    
 
    const deleteButton = document.createElement('div');
    deleteButton.className = 'd-flex justify-content-end mb-2';
    deleteButton.innerHTML = `
        <button type="button" class="btn btn-danger btn-sm" onclick="removeCertificateField(this)">
            <i class="bi bi-trash"></i> Sil
        </button>
    `;
    template.insertBefore(deleteButton, template.firstChild);
    
    document.getElementById('certificateFields').appendChild(template);
}

function removeEducationField(button) {
    const educationEntry = button.closest('.education-entry');
    const allEntries = document.querySelectorAll('.education-entry');
    
    if (allEntries.length > 1) {
        educationEntry.remove();
    }
}

function removeExperienceField(button) {
    const experienceEntry = button.closest('.experience-entry');
    const allEntries = document.querySelectorAll('.experience-entry');
    
    if (allEntries.length > 1) {
        experienceEntry.remove();
    }
}

function removeCertificateField(button) {
    const certificateEntry = button.closest('.certificate-entry');
    const allEntries = document.querySelectorAll('.certificate-entry');
    
    if (allEntries.length > 1) {
        certificateEntry.remove();
    }
}

function markdownToHtml(markdown) {
    // Başlıkları dönüştür
    markdown = markdown.replace(/^# (.*$)/gm, '<h1>$1</h1>');
    markdown = markdown.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    markdown = markdown.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    
    // Kalın ve italik metinleri dönüştür
    markdown = markdown.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    markdown = markdown.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Listeleri dönüştür
    markdown = markdown.replace(/^\s*\*\s(.*$)/gm, '<li>$1</li>');
    markdown = markdown.replace(/^\s*-\s(.*$)/gm, '<li>$1</li>');
    markdown = markdown.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
    
    // Linkleri dönüştür
    markdown = markdown.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
    
    // Satır sonlarını <br> ile değiştir
    markdown = markdown.replace(/\n/g, '<br>');
    
    return markdown;
}

function showLoading(pageId) {
    const loadingElement = document.querySelector(`#${pageId}Page .loading`);
    const outputElement = document.getElementById(`${pageId}Output`);
    const progressBar = loadingElement.querySelector('.progress-bar');
    
    // Yükleme elementini göster
    loadingElement.classList.remove('d-none');
    outputElement.classList.add('d-none');
    
    // Progress bar animasyonu
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress = (progress + 5) % 100;
        progressBar.style.width = `${progress}%`;
    }, 100);
    
    // Yükleme durumu mesajlarını güncelle
    const statusMessages = [
        'İçerik oluşturuluyor...',
        'Gemini API çalışıyor...',
        'Sonuçlar hazırlanıyor...'
    ];
    
    let currentMessageIndex = 0;
    const statusElement = loadingElement.querySelector('.status-message');
    
    const messageInterval = setInterval(() => {
        statusElement.textContent = statusMessages[currentMessageIndex];
        currentMessageIndex = (currentMessageIndex + 1) % statusMessages.length;
    }, 2000);
    
    return {
        hide: () => {
            clearInterval(progressInterval);
            clearInterval(messageInterval);
            loadingElement.classList.add('d-none');
        },
        showOutput: (content) => {
            outputElement.innerHTML = content;
            outputElement.classList.remove('d-none');
            outputElement.classList.add('show');
        }
    };
}

// API çağrısı için yardımcı fonksiyon
async function makeApiRequest(prompt) {
    const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}

// CV oluşturucu form submit handler'ını güncelle
document.getElementById('cvForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const loading = showLoading('cv');
    
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const skills = document.getElementById('skills').value;

    // Eğitim bilgileri
    const educationEntries = Array.from(document.querySelectorAll('.education-entry')).map(entry => ({
        school: entry.querySelector('[name="school"]').value,
        degree: entry.querySelector('[name="degree"]').value,
        startDate: entry.querySelector('[name="startDate"]').value,
        endDate: entry.querySelector('[name="endDate"]').value
    }));

    // İş deneyimi
    const experienceEntries = Array.from(document.querySelectorAll('.experience-entry')).map(entry => ({
        company: entry.querySelector('[name="company"]').value,
        position: entry.querySelector('[name="position"]').value,
        startDate: entry.querySelector('[name="startDate"]').value,
        endDate: entry.querySelector('[name="endDate"]').value,
        description: entry.querySelector('[name="description"]').value
    }));

    // Sertifikalar
    const certificateEntries = Array.from(document.querySelectorAll('.certificate-entry')).map(entry => ({
        name: entry.querySelector('[name="certificateName"]').value,
        organization: entry.querySelector('[name="issuingOrganization"]').value,
        issueDate: entry.querySelector('[name="issueDate"]').value,
        expiryDate: entry.querySelector('[name="expiryDate"]').value,
        url: entry.querySelector('[name="certificateUrl"]').value
    }));

    const prompt = `Aşağıdaki bilgileri kullanarak profesyonel bir CV oluştur:

Kişisel Bilgiler:
Ad Soyad: ${firstName} ${lastName}
E-posta: ${email}
Telefon: ${phone}
Adres: ${address}

Eğitim:
${educationEntries.map(edu => `- ${edu.school}, ${edu.degree} (${edu.startDate} - ${edu.endDate || 'Devam ediyor'})`).join('\n')}

İş Deneyimi:
${experienceEntries.map(exp => `- ${exp.company}, ${exp.position} (${exp.startDate} - ${exp.endDate || 'Devam ediyor'})
  ${exp.description}`).join('\n')}

Yetenekler:
${skills.split(',').map(skill => `- ${skill.trim()}`).join('\n')}

Sertifikalar:
${certificateEntries.map(cert => `- ${cert.name}, ${cert.organization} (${cert.issueDate}${cert.expiryDate ? ` - ${cert.expiryDate}` : ''})${cert.url ? `\n  URL: ${cert.url}` : ''}`).join('\n')}

Lütfen CV'yi profesyonel ve düzenli bir formatta oluştur.`;

    try {
        // Yeniden deneme mekanizması
        let retries = 5;
        let waitTime = 5000;
        let lastError = null;

        while (retries > 0) {
            try {
                const data = await makeApiRequest(prompt);
                
                if (data.candidates && data.candidates.length > 0 && 
                    data.candidates[0].content && 
                    data.candidates[0].content.parts && 
                    data.candidates[0].content.parts.length > 0) {
                    
                    const generatedCV = data.candidates[0].content.parts[0].text;
                    const htmlCV = markdownToHtml(generatedCV);
                    
                    loading.hide();
                    loading.showOutput(`
                        <div class="cv-preview">
                            <div class="cv-header">
                                <h1>${firstName} ${lastName}</h1>
                                <div class="contact-info">
                                    <p><i class="bi bi-envelope"></i> ${email}</p>
                                    <p><i class="bi bi-telephone"></i> ${phone}</p>
                                    <p><i class="bi bi-geo-alt"></i> ${address}</p>
                                </div>
                            </div>
                            <div class="cv-content">
                                ${htmlCV}
                            </div>
                        </div>
                    `);
                    return;
                } else {
                    throw new Error('API yanıt formatı beklenenden farklı');
                }
            } catch (error) {
                lastError = error;
                retries--;
                
                // Kullanıcıya durumu bildir
                loading.hide();
                loading.showOutput(`
                    <div class="alert alert-warning">
                        <h4>CV oluşturuluyor...</h4>
                        <p>${error.message}</p>
                        <p>Kalan deneme sayısı: ${retries}</p>
                        <p>Lütfen bekleyin...</p>
                    </div>
                `);
                
                if (retries > 0) {
                    // Her denemede bekleme süresini artır
                    await new Promise(resolve => setTimeout(resolve, waitTime));
                    waitTime *= 2;
                    continue;
                }
            }
        }

        // Tüm denemeler başarısız olduysa
        throw new Error('API şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyiniz.');

    } catch (error) {
        console.error('Error generating CV:', error);
        loading.hide();
        loading.showOutput(`
            <div class="alert alert-danger">
                <h4>CV oluşturulurken bir hata oluştu</h4>
                <p>${error.message}</p>
                <p>Lütfen daha sonra tekrar deneyiniz.</p>
            </div>
        `);
    }
});

// Metin oluşturucu form submit handler'ını güncelle
document.getElementById('textForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const loading = showLoading('text');
    
    const keywords = document.getElementById('keywords').value;
    const textLength = document.getElementById('textLength').value;
    
    if (!keywords.trim()) {
        alert('Lütfen en az bir anahtar kelime girin.');
        return;
    }
    
    try {
        const prompt = `Aşağıdaki anahtar kelimeleri kullanarak ${textLength === 'short' ? 'kısa' : textLength === 'medium' ? 'orta uzunlukta' : 'uzun'} bir metin oluştur:
        
Anahtar Kelimeler: ${keywords}

Metin şu özelliklere sahip olmalı:
- Akıcı ve doğal bir dil kullanılmalı
- Anahtar kelimeler metne doğal bir şekilde yerleştirilmeli
- Metin tutarlı ve anlamlı olmalı
- ${textLength === 'short' ? '1 paragraf' : textLength === 'medium' ? '2-3 paragraf' : '4-5 paragraf'} uzunluğunda olmalı`;

        // Yeniden deneme mekanizması
        let retries = 5;
        let waitTime = 5000;
        let lastError = null;

        while (retries > 0) {
            try {
                const data = await makeApiRequest(prompt);
                
                if (data.candidates && data.candidates.length > 0 && 
                    data.candidates[0].content && 
                    data.candidates[0].content.parts && 
                    data.candidates[0].content.parts.length > 0) {
                    
                    const generatedText = data.candidates[0].content.parts[0].text;
                    loading.hide();
                    loading.showOutput(`
                        <h3 class="mb-3">Oluşturulan Metin</h3>
                        <div class="text-preview p-4 bg-light rounded">
                            ${generatedText}
                        </div>
                    `);
                    return;
                } else {
                    throw new Error('API yanıt formatı beklenenden farklı');
                }
            } catch (error) {
                lastError = error;
                retries--;
                
                // Kullanıcıya durumu bildir
                loading.hide();
                loading.showOutput(`
                    <div class="alert alert-warning">
                        <h4>Metin oluşturuluyor...</h4>
                        <p>${error.message}</p>
                        <p>Kalan deneme sayısı: ${retries}</p>
                        <p>Lütfen bekleyin...</p>
                    </div>
                `);
                
                if (retries > 0) {
                    // Her denemede bekleme süresini artır
                    await new Promise(resolve => setTimeout(resolve, waitTime));
                    waitTime *= 2;
                    continue;
                }
            }
        }

        // Tüm denemeler başarısız olduysa
        throw new Error('API şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyiniz.');

    } catch (error) {
        console.error('Error generating text:', error);
        loading.hide();
        loading.showOutput(`
            <div class="alert alert-danger">
                <h4>Metin oluşturulurken bir hata oluştu</h4>
                <p>${error.message}</p>
                <p>Lütfen daha sonra tekrar deneyiniz.</p>
            </div>
        `);
    }
});

document.getElementById('titleForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const loading = showLoading('title');
    
    const content = document.getElementById('content').value;
    const titleStyle = document.getElementById('titleStyle').value;
    const titleCount = document.getElementById('titleCount').value;
    
    if (!content.trim()) {
        alert('Lütfen içerik girin.');
        return;
    }
    
    try {
        const prompt = `Aşağıdaki içeriği kullanarak ${titleCount} adet ${titleStyle} başlık oluştur:
        
İçerik: ${content}

Başlıklar şu özelliklere sahip olmalı:
- Dikkat çekici ve ilgi uyandırıcı olmalı
- İçerikle uyumlu olmalı
- ${titleStyle} stiline uygun olmalı
- Her başlık yeni bir satırda olmalı`;

        // Yeniden deneme mekanizması
        let retries = 5;
        let waitTime = 5000;
        let lastError = null;

        while (retries > 0) {
            try {
                const data = await makeApiRequest(prompt);
                
                if (data.candidates && data.candidates.length > 0 && 
                    data.candidates[0].content && 
                    data.candidates[0].content.parts && 
                    data.candidates[0].content.parts.length > 0) {
                    
                    const generatedTitles = data.candidates[0].content.parts[0].text;
                    loading.hide();
                    loading.showOutput(`
                        <h3 class="mb-3">Oluşturulan Başlıklar</h3>
                        <div class="title-preview p-4 bg-light rounded">
                            ${generatedTitles}
                        </div>
                    `);
                    return;
                } else {
                    throw new Error('API yanıt formatı beklenenden farklı');
                }
            } catch (error) {
                lastError = error;
                retries--;
                
                // Kullanıcıya durumu bildir
                loading.hide();
                loading.showOutput(`
                    <div class="alert alert-warning">
                        <h4>Başlıklar oluşturuluyor...</h4>
                        <p>${error.message}</p>
                        <p>Kalan deneme sayısı: ${retries}</p>
                        <p>Lütfen bekleyin...</p>
                    </div>
                `);
                
                if (retries > 0) {
                    await new Promise(resolve => setTimeout(resolve, waitTime));
                    waitTime *= 2;
                    continue;
                }
            }
        }
        throw new Error('API şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyiniz.');

    } catch (error) {
        console.error('Error generating titles:', error);
        loading.hide();
        loading.showOutput(`
            <div class="alert alert-danger">
                <h4>Başlıklar oluşturulurken bir hata oluştu</h4>
                <p>${error.message}</p>
                <p>Lütfen daha sonra tekrar deneyiniz.</p>
            </div>
        `);
    }
});

// README oluşturucu
document.getElementById('readmeForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const loading = showLoading('readme');
    
    const projectName = document.getElementById('projectName').value;
    const projectType = document.getElementById('projectType').value;
    const projectDescription = document.getElementById('projectDescription').value;
    const techStack = document.getElementById('techStack').value.split(',').map(tech => tech.trim());
    const features = document.getElementById('features').value.split('\n').filter(feature => feature.trim());
    const installation = document.getElementById('installation').value.split('\n').filter(step => step.trim());
    const usage = document.getElementById('usage').value.split('\n').filter(example => example.trim());
    const contributing = document.getElementById('contributing').value;
    const license = document.getElementById('license').value;
    const versionBadge = document.getElementById('versionBadge').checked;
    const licenseBadge = document.getElementById('licenseBadge').checked;
    const starsBadge = document.getElementById('starsBadge').checked;
    const readmeLanguage = document.getElementById('readmeLanguage').value;
    
    try {
        // Türkçe ve İngilizce prompt'ları hazırla
        const prompts = {
            tr: `Aşağıdaki bilgileri kullanarak profesyonel bir GitHub README.md dosyası oluştur:

Proje Adı: ${projectName}
Proje Türü: ${projectType}
Proje Açıklaması: ${projectDescription}
Kullanılan Teknolojiler: ${techStack.join(', ')}
Öne Çıkan Özellikler:
${features.map(feature => `- ${feature}`).join('\n')}
Kurulum Adımları:
${installation.map(step => `- ${step}`).join('\n')}
Kullanım Örnekleri:
${usage.map(example => `- ${example}`).join('\n')}
Katkıda Bulunma: ${contributing}
Lisans: ${license}

README şu özelliklere sahip olmalı:
- Profesyonel ve düzenli bir format
- Markdown syntax'ı kullanılmalı
- Başlıklar ve alt başlıklar uygun şekilde kullanılmalı
- Kod blokları için uygun dil belirtilmeli
- ${versionBadge ? 'Versiyon rozeti eklenmeli' : ''}
- ${licenseBadge ? 'Lisans rozeti eklenmeli' : ''}
- ${starsBadge ? 'Yıldız rozeti eklenmeli' : ''}
- Teknolojiler için rozetler eklenmeli
- Kurulum ve kullanım adımları net ve anlaşılır olmalı
- Örnekler ve kod blokları açıklayıcı olmalı`,

            en: `Create a professional GitHub README.md file using the following information:

Project Name: ${projectName}
Project Type: ${projectType}
Project Description: ${projectDescription}
Technologies Used: ${techStack.join(', ')}
Key Features:
${features.map(feature => `- ${feature}`).join('\n')}
Installation Steps:
${installation.map(step => `- ${step}`).join('\n')}
Usage Examples:
${usage.map(example => `- ${example}`).join('\n')}
Contributing: ${contributing}
License: ${license}

The README should have the following characteristics:
- Professional and organized format
- Use Markdown syntax
- Proper use of headings and subheadings
- Appropriate language specification for code blocks
- ${versionBadge ? 'Include version badge' : ''}
- ${licenseBadge ? 'Include license badge' : ''}
- ${starsBadge ? 'Include stars badge' : ''}
- Badges for technologies
- Clear and understandable installation and usage steps
- Explanatory examples and code blocks`
        };

        let generatedReadme = '';

        if (readmeLanguage === 'both') {
            // Her iki dil için de README oluştur
            const [trResponse, enResponse] = await Promise.all([
                makeApiRequest(prompts.tr),
                makeApiRequest(prompts.en)
            ]);

            const trContent = trResponse.candidates[0].content.parts[0].text;
            const enContent = enResponse.candidates[0].content.parts[0].text;

            // İki dili birleştir
            generatedReadme = `# ${projectName} / ${projectName}

## Türkçe / Turkish

${trContent}

---

## English

${enContent}`;
        } else {
            // Seçilen dil için README oluştur
            const response = await makeApiRequest(prompts[readmeLanguage]);
            generatedReadme = response.candidates[0].content.parts[0].text;
        }

        loading.hide();
        loading.showOutput(`
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h3>Oluşturulan README</h3>
                <div>
                    <button class="btn btn-outline-primary me-2" onclick="copyReadme()">
                        <i class="bi bi-clipboard"></i> Kopyala
                    </button>
                    <button class="btn btn-outline-success" onclick="downloadReadme()">
                        <i class="bi bi-download"></i> İndir
                    </button>
                </div>
            </div>
            <div class="readme-preview p-4 bg-light rounded">
                ${markdownToHtml(generatedReadme)}
            </div>
        `);
        
        // README içeriğini global değişkende sakla
        window.currentReadme = generatedReadme;
    } catch (error) {
        console.error('Error generating README:', error);
        loading.hide();
        loading.showOutput(`
            <div class="alert alert-danger">
                <h4>README oluşturulurken bir hata oluştu</h4>
                <p>${error.message}</p>
                <p>Lütfen daha sonra tekrar deneyiniz.</p>
            </div>
        `);
    }
});

// README kopyalama
function copyReadme() {
    if (window.currentReadme) {
        navigator.clipboard.writeText(window.currentReadme)
            .then(() => {
                alert('README panoya kopyalandı!');
            })
            .catch(err => {
                console.error('Kopyalama hatası:', err);
                alert('README kopyalanırken bir hata oluştu.');
            });
    }
}

// README indirme fonksiyonu
function downloadReadme() {
    if (window.currentReadme) {
        const blob = new Blob([window.currentReadme], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'README.md';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// Otomatik doldurma fonksiyonu
function autoFillCV() {
    // Rastgele isimler ve bilgiler
    const names = ['Ahmet', 'Mehmet', 'Ayşe', 'Fatma', 'Ali', 'Zeynep', 'Mustafa', 'Emine'];
    const lastNames = ['Akpoyraz'];
    const cities = ['Malatya'];
    const universities = ['İstanbul Teknik Üniversitesi', 'Boğaziçi Üniversitesi', 'Orta Doğu Teknik Üniversitesi', 'Hacettepe Üniversitesi', 'Ege Üniversitesi'];
    const departments = ['Bilgisayar Mühendisliği', 'Elektrik-Elektronik Mühendisliği', 'Makine Mühendisliği', 'Endüstri Mühendisliği', 'Yazılım Mühendisliği'];
    const companies = ['Tech Solutions A.Ş.', 'Digital Innovations', 'Software House', 'IT Consulting', 'Web Development Co.'];
    const positions = ['Frontend Geliştirici', 'Backend Geliştirici', 'Full Stack Geliştirici', 'Yazılım Mühendisi', 'Proje Yöneticisi'];
    const skills = ['JavaScript', 'Python', 'React', 'Node.js', 'HTML', 'CSS', 'SQL', 'Git', 'Docker', 'AWS'];
    const certificates = ['Full Stack Web Development', 'Data Science', 'Cloud Computing', 'DevOps', 'Machine Learning'];
    const organizations = ['Udemy', 'Coursera', 'edX', 'Google', 'Microsoft'];

    // Rastgele seçimler yap
    const firstName = names[Math.floor(Math.random() * names.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const university = universities[Math.floor(Math.random() * universities.length)];
    const department = departments[Math.floor(Math.random() * departments.length)];
    const company = companies[Math.floor(Math.random() * companies.length)];
    const position = positions[Math.floor(Math.random() * positions.length)];
    const certificate = certificates[Math.floor(Math.random() * certificates.length)];
    const organization = organizations[Math.floor(Math.random() * organizations.length)];

    // Rastgele telefon numarası oluştur
    const phone = `+90 ${Math.floor(Math.random() * 500) + 500} ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 9000) + 1000}`;

    // Rastgele adres oluştur
    const address = `${Math.floor(Math.random() * 100) + 1}. Sokak No:${Math.floor(Math.random() * 100) + 1}, ${city}`;

    // Rastgele tarihler oluştur
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - Math.floor(Math.random() * 5) - 2;
    const endYear = startYear + Math.floor(Math.random() * 3) + 1;

    // Rastgele skills oluştur
    const selectedSkills = [];
    const numSkills = Math.floor(Math.random() * 5) + 3;
    const shuffledSkills = [...skills].sort(() => 0.5 - Math.random());
    for (let i = 0; i < numSkills; i++) {
        selectedSkills.push(shuffledSkills[i]);
    }

    // Kişisel bilgileri doldur
    document.getElementById('firstName').value = firstName;
    document.getElementById('lastName').value = lastName;
    document.getElementById('email').value = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`;
    document.getElementById('phone').value = phone;
    document.getElementById('address').value = address;
    document.getElementById('skills').value = selectedSkills.join(', ');

    // Eğitim bilgilerini doldur
    const educationEntry = document.querySelector('.education-entry');
    educationEntry.querySelector('[name="school"]').value = university;
    educationEntry.querySelector('[name="degree"]').value = department;
    educationEntry.querySelector('[name="startDate"]').value = `${startYear}-09-01`;
    educationEntry.querySelector('[name="endDate"]').value = `${endYear}-06-30`;

    // İş deneyimini doldur
    const experienceEntry = document.querySelector('.experience-entry');
    experienceEntry.querySelector('[name="company"]').value = company;
    experienceEntry.querySelector('[name="position"]').value = position;
    experienceEntry.querySelector('[name="startDate"]').value = `${endYear}-07-01`;
    experienceEntry.querySelector('[name="endDate"]').value = '';
    experienceEntry.querySelector('[name="description"]').value = `${position} olarak ${company}'de çalışıyorum. ${selectedSkills.slice(0, 3).join(', ')} gibi teknolojileri kullanarak projeler geliştiriyorum.`;

    // Sertifikaları doldur
    const certificateEntry = document.querySelector('.certificate-entry');
    certificateEntry.querySelector('[name="certificateName"]').value = certificate;
    certificateEntry.querySelector('[name="issuingOrganization"]').value = organization;
    certificateEntry.querySelector('[name="issueDate"]').value = `${endYear}-03-15`;
    certificateEntry.querySelector('[name="expiryDate"]').value = 'Süresiz';
    certificateEntry.querySelector('[name="certificateUrl"]').value = `https://www.${organization.toLowerCase()}.com/certificate/example`;
}

function autoFillTitle() {
    document.getElementById('content').value = `Yapay zeka teknolojileri günümüzde hızla gelişiyor ve birçok sektörde kullanılıyor. 
Bu makalede, yapay zekanın iş dünyasındaki uygulamalarını ve gelecekteki potansiyelini inceleyeceğiz. 
Özellikle otomasyon, veri analizi ve karar verme süreçlerindeki rolüne odaklanacağız.`;
    
    document.getElementById('titleStyle').value = 'creative';
    document.getElementById('titleCount').value = '5';
}

function autoFillReadme() {
    // Proje bilgileri
    document.getElementById('projectName').value = 'AI Content Generator';
    document.getElementById('projectType').value = 'web';
    document.getElementById('projectDescription').value = 'Yapay zeka destekli içerik oluşturma platformu. CV, metin ve başlık oluşturma özellikleri sunar.';

    // Teknik detaylar
    document.getElementById('techStack').value = 'JavaScript, HTML, CSS, Bootstrap, Gemini API';
    document.getElementById('features').value = `- CV oluşturma
- Metin oluşturma
- Başlık oluşturma
- Markdown formatında çıktı
- Responsive tasarım
- Kullanıcı dostu arayüz`;

    // Kurulum ve kullanım
    document.getElementById('installation').value = `1. Projeyi klonlayın
2. npm install komutunu çalıştırın
3. node server.js ile sunucuyu başlatın
4. Tarayıcıda http://localhost:3000 adresine gidin`;

    document.getElementById('usage').value = `1. Ana sayfadan istediğiniz oluşturucuyu seçin
2. Formu doldurun
3. "Oluştur" butonuna tıklayın
4. Oluşturulan içeriği kopyalayın veya indirin`;

    // Ek bilgiler
    document.getElementById('contributing').value = 'Katkıda bulunmak için lütfen bir issue açın veya pull request gönderin.';
    document.getElementById('license').value = 'MIT';

    // Rozetler
    document.getElementById('versionBadge').checked = true;
    document.getElementById('licenseBadge').checked = true;
    document.getElementById('starsBadge').checked = true;
}

// Otomatik doldur butonlarına event listener'lar ekle
document.getElementById('autoFillTitleBtn').addEventListener('click', autoFillTitle);
document.getElementById('autoFillReadmeBtn').addEventListener('click', autoFillReadme);
document.getElementById('autoFillCVBtn').addEventListener('click', autoFillCV);

// Sayfa geçişleri için event listener'lar
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetPage = this.getAttribute('data-page');
        
        // Aktif sayfayı değiştir
        document.querySelectorAll('.page').forEach(page => {
            page.classList.add('d-none');
        });
        document.getElementById(targetPage + 'Page').classList.remove('d-none');
        
        // Navbar linklerini güncelle
        document.querySelectorAll('.nav-link').forEach(navLink => {
            navLink.classList.remove('active');
        });
        this.classList.add('active');
    });
}); 