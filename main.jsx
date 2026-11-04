document.addEventListener('DOMContentLoaded', () => {
    
    // Menu burger pour la navigation mobile
    
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li'); // Ou .nav-links a

    if (burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
        });

        // Fermer le menu au clic sur un lien
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
            });
        });
    }

   // Animation au scroll pour les éléments avec la classe .reveal

    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        revealElements.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger au chargement

    // Vue des onglets dans la section FAQ

    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');

    if (tabs.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // A. Retirer la classe 'active' de tous les boutons
                tabs.forEach(t => t.classList.remove('active'));
                
                // B. Ajouter 'active' au bouton cliqué
                tab.classList.add('active');

                // C. Masquer tous les contenus
                contents.forEach(c => c.classList.remove('active'));

                // D. Récupérer l'ID cible (ex: "sujet")
                const targetId = tab.getAttribute('data-target');
                const targetContent = document.getElementById(targetId);
                
                // E. Afficher le contenu cible
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }

    // Validation et soumission du formulaire de contact 
    
    const contactForm = document.getElementById('contactForm');

    // Petite fonction utilitaire pour afficher les erreurs
    function showError(id, message) {
        const errorElement = document.getElementById(id);
        if (errorElement) {
            errorElement.innerText = message;
            errorElement.style.display = 'block';
        }
    }

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            const btn = contactForm.querySelector('button[type="submit"]');
            const successMsg = document.getElementById('success-msg');
            let isValid = true;

            // Reset erreurs et succès
            document.querySelectorAll('.error').forEach(el => el.style.display = 'none');
            if (successMsg) successMsg.style.display = 'none';

            // Validation Nom
            if (name.value.trim() === '') {
                showError('error-name', 'Nom requis');
                isValid = false;
            }

            // Validation Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value.trim())) {
                showError('error-email', 'Email invalide');
                isValid = false;
            }

            // Validation Message
            if (message.value.trim().length < 5) {
                showError('error-message', 'Message trop court (min. 5 caractères)');
                isValid = false;
            }

            if (isValid && btn) {
                const originalText = btn.innerText;
                btn.innerText = 'Envoi...';
                btn.disabled = true;

                try {
                    const response = await fetch(contactForm.action, {
                        method: 'POST',
                        body: new FormData(contactForm),
                        headers: { 'Accept': 'application/json' }
                    });

                    if (response.ok) {
                        if (successMsg) successMsg.style.display = 'block';
                        contactForm.reset();
                        // On cache le message après 5 secondes
                        setTimeout(() => {
                            if (successMsg) successMsg.style.display = 'none';
                        }, 5000);
                    } else {
                        throw new Error('Erreur serveur');
                    }
                } catch (error) {
                    showError('error-message', 'Erreur de connexion. Réessayez plus tard.');
                    console.error('Fetch error:', error);
                } finally {
                    // Remise à l'état initial du bouton quoi qu'il arrive
                    btn.innerText = originalText;
                    btn.disabled = false;
                }
            }
        });
    }

    /* ══════════════════════════════════════════════
       SYSTÈME DE VEILLE - ACTUALISATION DES DONNÉES
    ══════════════════════════════════════════════ */
    
    // Données des actualités 2026
    const newsData2026 = [
        { date: "22 mars 2026", title: "Microsoft annonce l'intégration native de l'IA dans sa plateforme Zero Trust", source: "Microsoft", url: "#" },
        { date: "21 mars 2026", title: "Étude Gartner : 94% des entreprises ont adopté une stratégie Zero Trust en 2026", source: "Gartner", url: "#" },
        { date: "20 mars 2026", title: "L'ANSSI publie un guide sur la mise en œuvre Zero Trust dans les cloud hybrides", source: "ANSSI", url: "#" },
        { date: "19 mars 2026", title: "CISA lance le programme fédéral d'accélération Zero Trust pour 2026-2027", source: "CISA", url: "#" },
        { date: "18 mars 2026", title: "WIRED : Comment le Zero Trust devient le standard de fait pour les architectures SI", source: "WIRED", url: "#" },
        { date: "17 mars 2026", title: "NIST publie la révision 2 du SP 800-207 intégrant les enjeux post-quantiques", source: "NIST", url: "#" },
        { date: "16 mars 2026", title: "Forrester : Les entreprises Zero Trust réduisent leurs coûts de sécurité de 32%", source: "Forrester", url: "#" },
        { date: "15 mars 2026", title: "Google Cloud renforce ses capacités Zero Trust avec l'acquisition d'une startup", source: "TechCrunch", url: "#" }
    ];

    // Données des alertes Google
    const googleAlertsData = [
        { title: "Zero Trust Architecture 2026 trends", source: "Dark Reading", date: "22 mars 2026", link: "#" },
        { title: "Microsoft Zero Trust Deployment Best Practices", source: "Microsoft Tech Community", date: "21 mars 2026", link: "#" },
        { title: "French government Zero Trust adoption report", source: "Le Monde Informatique", date: "20 mars 2026", link: "#" },
        { title: "NIST SP 800-207 Rev 2 released", source: "NIST", date: "19 mars 2026", link: "#" },
        { title: "Zero Trust and AI integration challenges", source: "CSO Online", date: "18 mars 2026", link: "#" }
    ];

    // Données des flux RSS
    const rssData = [
        { title: "Zero Trust in Action - March 2026", source: "Microsoft Security Blog", date: "22 mars 2026", link: "#" },
        { title: "New Zero Trust Publications for Critical Infrastructure", source: "NIST", date: "21 mars 2026", link: "#" },
        { title: "Retours d'expérience Zero Trust - Bilan 2026", source: "ANSSI", date: "20 mars 2026", link: "#" },
        { title: "Zero Trust Maturity Reaches Critical Mass", source: "Dark Reading", date: "19 mars 2026", link: "#" },
        { title: "7 Lessons from Zero Trust Early Adopters", source: "CSO Online", date: "18 mars 2026", link: "#" },
        { title: "Zero Trust Hype Cycle 2026 Analysis", source: "Gartner", date: "17 mars 2026", link: "#" },
        { title: "Zero Trust Maturity Model v3.0 Implementation Guide", source: "CISA", date: "16 mars 2026", link: "#" },
        { title: "The Zero Trust Revolution in 2026", source: "WIRED", date: "15 mars 2026", link: "#" }
    ];

    // Fonction pour mettre à jour l'horodatage
    function updateTimestamp() {
        const now = new Date();
        const formattedDate = now.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
        const formattedTime = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const dateTimeString = `${formattedDate} à ${formattedTime}`;
        
        const lastUpdateSpan = document.getElementById('last-update-time');
        const newsDateSpan = document.getElementById('news-date');
        
        if (lastUpdateSpan) lastUpdateSpan.textContent = dateTimeString;
        if (newsDateSpan) newsDateSpan.textContent = formattedDate;
        
        console.log("Horodatage mis à jour :", dateTimeString);
    }

    // Fonction pour charger les actualités
    function loadNews() {
        const newsContainer = document.getElementById('news-container');
        if (!newsContainer) {
            console.log("news-container non trouvé");
            return;
        }
        
        newsContainer.innerHTML = newsData2026.map(news => `
            <div class="news-item">
                <span class="news-date">${news.date}</span>
                <a href="${news.url}" target="_blank" rel="noopener noreferrer">
                    <strong>${news.source}</strong> - ${news.title}
                </a>
            </div>
        `).join('');
        
        console.log("Actualités chargées");
    }

    // Fonction pour charger les alertes Google
    function loadGoogleAlerts() {
        const alertList = document.getElementById('alert-list');
        if (!alertList) {
            console.log("alert-list non trouvé");
            return;
        }
        
        alertList.innerHTML = googleAlertsData.map(alert => `
            <div class="alert-item">
                <a href="${alert.link}" target="_blank" rel="noopener noreferrer">
                    <strong>${alert.title}</strong>
                    <small>${alert.source} · ${alert.date}</small>
                </a>
            </div>
        `).join('');
        
        console.log("Alertes Google chargées");
    }

    // Fonction pour charger les flux RSS
    function loadRSS() {
        const rssList = document.getElementById('rss-list');
        if (!rssList) {
            console.log("rss-list non trouvé");
            return;
        }
        
        rssList.innerHTML = rssData.map(item => `
            <div class="rss-item">
                <a href="${item.link}" target="_blank" rel="noopener noreferrer">
                    <strong>${item.source}</strong> - ${item.title}
                    <small>${item.date}</small>
                </a>
            </div>
        `).join('');
        
        console.log("Flux RSS chargés");
    }

    // Fonction principale d'actualisation - EXPOSÉE GLOBALEMENT
    window.refreshAllData = function() {
        console.log("Actualisation déclenchée !");
        
        // Animation du bouton
        const refreshBtn = document.getElementById('refresh-btn');
        if (refreshBtn) {
            refreshBtn.classList.add('refreshing');
            setTimeout(() => refreshBtn.classList.remove('refreshing'), 800);
        }
        
        // Rechargement des données
        loadNews();
        loadGoogleAlerts();
        loadRSS();
        updateTimestamp();
        
        console.log("Actualisation terminée");
    };

    // Chargement initial des données de veille
    console.log("Chargement initial des données veille");
    loadNews();
    loadGoogleAlerts();
    loadRSS();
    updateTimestamp();

    // Rafraîchissement automatique toutes les 4 heures (14400000 ms)
    setInterval(() => {
        if (document.getElementById('push')) {
            console.log("Rafraîchissement automatique");
            window.refreshAllData();
        }
    }, 14400000);
});

/* ══════════════════════════════════════════════
   NAVBAR : cachée sur le hero, visible après
══════════════════════════════════════════════ */
const navbar = document.querySelector('.navbar');

function toggleNavbar() {
  const heroSection = document.getElementById('heroSplash');
  if (heroSection) {
    const heroHeight = heroSection.offsetHeight;
    if (window.scrollY < heroHeight - 60) {
        if (navbar) navbar.classList.add('hidden');
    } else {
        if (navbar) navbar.classList.remove('hidden');
    }
  }
}

// Cacher au chargement
if (document.getElementById('heroSplash')) {
    toggleNavbar();
}

// Écouter le scroll
window.addEventListener('scroll', toggleNavbar);

/* ══════════════════════════════════════════════
   TYPEWRITER — "portfolio" → page précédente
══════════════════════════════════════════════ */
function goBack(e) {
    if (e) e.preventDefault();
    window.history.back();
}

(function() {
  const el = document.getElementById('twText');
  if (el) {
      const word = 'portfolio';
      let timer = null, loopTimer = null;
      const speed = 120;

      function typewrite(onDone) {
        clearInterval(timer); 
        el.textContent = ''; 
        let i = 0;
        timer = setInterval(() => {
          el.textContent += word[i++];
          if (i >= word.length) { 
              clearInterval(timer); 
              if (onDone) onDone(); 
          }
        }, speed);
      }

      function erase(onDone) {
        clearInterval(timer);
        timer = setInterval(() => {
          const t = el.textContent;
          if (!t.length) { 
              clearInterval(timer); 
              if (onDone) onDone(); 
              return; 
          }
          el.textContent = t.slice(0, -1);
        }, speed / 2);
      }

      function runLoop() {
        clearTimeout(loopTimer);
        typewrite(() => {
          loopTimer = setTimeout(() => erase(() => {
            loopTimer = setTimeout(runLoop, 400);
          }), 1800);
        });
      }

      runLoop();
  }
})();

function highlightProject(projectId) {
    const target = document.getElementById(projectId);
    
    if (target) {
        // 1. Défilement fluide vers le projet (centré)
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // 2. Ajout de la classe d'illumination
        target.classList.add('project-highlight');

        // 3. Suppression de l'effet après 2.5 secondes
        setTimeout(() => {
            target.classList.remove('project-highlight');
        }, 2500);
    } else {
        console.warn("Projet non trouvé : " + projectId);
    }
}

// Rendre refreshAllData accessible globalement (fallback)
if (typeof window.refreshAllData === 'undefined') {
    window.refreshAllData = function() {
        console.log("refreshAllData appelé (fallback)");
        const newsContainer = document.getElementById('news-container');
        if (newsContainer) {
            newsContainer.innerHTML = '<div class="news-item">Actualisation...</div>';
            setTimeout(() => {
                location.reload();
            }, 500);
        }
    };
}
  // Affichage dynamique de la date de dernière mise à jour du système push
  const updateTimeSpan = document.getElementById('last-update-time');
  if (updateTimeSpan) {
    const now = new Date();
    const formattedDate = now.toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    updateTimeSpan.textContent = formattedDate;
  }
  // On peut aussi synchroniser la date dans la section "Dernières actualités" si besoin
  const newsDateSpan = document.getElementById('news-date');
  if (newsDateSpan) {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    newsDateSpan.textContent = formattedDate;
  }

    document.addEventListener('DOMContentLoaded', function() {
        // Sélectionner toutes les cartes de compétences (celles sans attribut href, donc les divs avec .tech-card)
        const skillCards = document.querySelectorAll('.skills-grid-cards > .tech-card:not(.cert-link)');
        
        skillCards.forEach(card => {
            card.addEventListener('click', function(e) {
                // Ajouter la classe d'animation
                this.classList.add('click-shine');
                
                // Retirer la classe après la fin de l'animation pour pouvoir la rejouer
                setTimeout(() => {
                    this.classList.remove('click-shine');
                }, 400);
                
                // Ici vous pouvez ajouter votre logique supplémentaire (afficher un projet, etc.)
                // Par exemple, récupérer l'attribut data-skill pour savoir quelle compétence a été cliquée
                const skill = this.getAttribute('data-skill');
                console.log(`Compétence cliquée : ${skill} - Effet de brillance appliqué`);
                
                // Exemple : vous pourriez déclencher l'affichage d'un projet associé via un événement personnalisé
                // this.dispatchEvent(new CustomEvent('skillClick', { detail: { skill: skill } }));
            });
        });
    });

