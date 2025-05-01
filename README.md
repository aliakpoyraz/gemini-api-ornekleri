
# 🚀 Gemini API Örnekleri - HackGDG'25

Bu proje Ostim Teknik Üniversitesi Ostimtech GDG tarafından düzenlenen **HackGDG'25** hackathonu öncesinde gerçekleştirilen bir eğitim kapsamında örnek teşkil etmesi amacıyla geliştirilmiştir.

## 📌 Proje Açıklaması
  

**Gemini API** kullanılarak hazırlanan bu örnek uygulama, aşağıdaki içerik üretim araçlarını sunar:


- 📄 CV Oluşturma

- ✍️ Metin Oluşturma

- 📰 Metin Başlığı Oluşturma

- 📘 README Dosyası Oluşturma

  

## 🛠️ Kullanılan Teknolojiler

  

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=fff)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=fff)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?logo=bootstrap&logoColor=fff)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=fff)
![Express.js](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=fff)
![Gemini API](https://img.shields.io/badge/Gemini_API-4285F4?logo=google&logoColor=fff)

 
## ✨ Öne Çıkan Özellikler

  

- ✅ CV oluşturma

- ✅ Metin oluşturma

- ✅ Başlık oluşturma

- ✅ README dosyası oluşturma

- ✅ Markdown formatında çıktı

- ✅ Responsive tasarım

- ✅ Kullanıcı dostu arayüz

  

# 📦 Kurulum Adımları
## Node.JS kurulumu

Node.js JavaScript çalıştırmak için kullanılan sunucu taraflı bir platformdur. Aşağıda üç farklı işletim sistemi için kurulum adımları birlikte sunulmuştur.

---

## 📥 1. Node.js Kurulum Dosyasını İndirme

Tüm platformlar için ilk adım:
- Resmi web sitesine gidin: [https://nodejs.org](https://nodejs.org)
- "LTS" (Long-Term Support) sürümünü tercih edin.
- İşletim sisteminize uygun dosyayı indirin:
  - **Windows:** `.msi`
  - **macOS:** `.pkg`
  - **Linux:** terminal komutları ile kurulacak (aşağıda açıklanmıştır)

---

## ⚙️ 2. Kurulum Adımları

### 🖥️ Windows

- İndirilen `.msi` dosyasını çalıştırın.
- Kurulum sihirbazını takip ederek Node.js ve npm'i yükleyin.
- Kurulumdan sonra Başlat menüsünden "Komut İstemi" veya PowerShell'i açın:

  ```bash
  node -v
  npm -v
  ```

### 🍎 macOS

#### Seçenek 1: `.pkg` Dosyası ile

- İndirilen `.pkg` dosyasını çalıştırın.
- Kurulum adımlarını takip edin.
- Terminal’i açıp aşağıdaki komutlarla kurulumu doğrulayın:

  ```bash
  node -v
  npm -v
  ```

#### Seçenek 2: Homebrew ile

Terminal’e şu komutları yazın:

```bash
brew update
brew install node
```

Doğrulama:

```bash
node -v
npm -v
```

### 🐧 Linux (Ubuntu / Debian)

#### Yöntem 1: NodeSource (Tavsiye Edilen)

```bash
sudo apt update
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs
```

#### Yöntem 2: Varsayılan APT (Eski sürüm olabilir)

```bash
sudo apt update
sudo apt install nodejs npm
```

Doğrulama (her iki yöntem sonrası):

```bash
node -v
npm -v
```

> ⚠️ Not: `apt install` yöntemi daha eski bir sürüm kurabilir. Güncel sürüm için NodeSource tercih edilmelidir.

---

## ✅ Kurulum Doğrulama

İşletim sistemi fark etmeksizin terminal veya komut istemcisine aşağıdaki komutları girerek kurulumun başarıyla gerçekleştiğinden emin olun:

```bash
node -v
npm -v
```

Bu komutlar sırasıyla Node.js ve npm sürümünüzü gösterecektir.

## Önerilen versiyonlar;
- node.js version 22.14.0 ve üzeri versiyonlar
- npm version 10.9.2 ve üzeri versiyonlar
<img width="415" alt="Screenshot 2025-05-01 at 13 53 24" src="https://github.com/user-attachments/assets/aac549e9-f047-485d-acd9-422309d3a131" />

---

# 🔑 Gemini API Anahtarı Alma Rehberi

Google'ın yapay zeka modellerini kullanmak için Gemini API anahtarına ihtiyacınız vardır. Aşağıdaki adımları izleyerek kendi API anahtarınızı kolayca oluşturabilirsiniz.

---

## 🌐 1. Google AI Studio'ya Giriş Yapın

- Tarayıcınızdan [https://makersuite.google.com/app](https://makersuite.google.com/app) adresine gidin.
- Google hesabınızla giriş yapın.

---

## 🔧 2. API Key Oluşturun

1. Sayfanın sağ üst kısmında bulunan profil simgesine veya menüye tıklayın.
2. Açılan seçenekler arasından **"Get API Key"**, **"API Anahtarı Al"** veya benzeri bir seçeneği bulun ve tıklayın.
3. Yeni bir API anahtarı oluşturulacak ve size gösterilecektir.
4. Bu anahtarı kopyalayın ve güvenli bir yerde saklayın.

> ⚠️ Not: API anahtarınızı kimseyle paylaşmayın. Anahtarınızla yapılacak kötü amaçlı kullanımlar sizin hesabınızdan sayılır.

---

# 🚀 Proje Kurulum Adımları

## 🛠️ Adımlar

```bash
# 1. Projeyi klonlayın
git clone https://github.com/aliakpoyraz/gemini-api-ornekleri.git

# 2. Proje klasörüne geçin
cd gemini-api-ornegi

# 3. Gerekli kurulumları yapın
npm install
```

Proje dosyası içerisinde bulunan `script.js` ve `server.js` dosyalarındaki `API_KEY` bölümlerini kendi API anahtarınız ile değiştirin.  
Aksi halde program düzgün bir şekilde çalışmayacaktır.

```bash
# 4. Sunucuyu başlatın
node server.js
```

---

## 🌐 Uygulamayı Görüntüleme

Tarayıcıdan aşağıdaki adrese giderek uygulamayı görüntüleyebilirsiniz:

[http://localhost:3000/index.html](http://localhost:3000/index.html)


## 💡 Kullanım

1. Ana  sayfadan  istediğiniz  oluşturucuyu  seçin
2. Gerekli  alanları  doldurun
3. "Oluştur"  butonuna  tıklayın
4. Oluşturulan  içeriği  kopyalayın  veya  indirin

# Şu anda okuduğunuz Readme dosyası **"Gemini API Uygulamaları - HackGDG'25"** Reposunda bulunan Web Uygulaması ile yazdırılmıştır.
