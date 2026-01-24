// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 500);
});

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });
}

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Progress Bar
const progressBar = document.getElementById('progressBar');
if (progressBar) {
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Scroll to Top Button
const scrollTop = document.getElementById('scrollTop');
if (scrollTop) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTop.classList.add('visible');
        } else {
            scrollTop.classList.remove('visible');
        }
    });

    scrollTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for Fade In Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Lightbox Functionality
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const galleryItems = document.querySelectorAll('.gallery-item');
let currentImageIndex = 0;
let images = [];

// Collect all images
if (galleryItems.length > 0) {
    galleryItems.forEach(item => {
        const img = item.querySelector('img');
        if (img) {
            images.push({
                src: item.dataset.image || img.src.replace('w=800', 'w=1200'),
                alt: img.alt
            });
        }
    });

    // Open lightbox
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentImageIndex = index;
            openLightbox();
        });
    });
}

function openLightbox() {
    if (lightboxImage && images.length > 0) {
        lightboxImage.src = images[currentImageIndex].src;
        lightboxImage.alt = images[currentImageIndex].alt;
        if (lightbox) {
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
}

function closeLightbox() {
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function showNextImage() {
    if (images.length > 0) {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        if (lightboxImage) {
            lightboxImage.src = images[currentImageIndex].src;
            lightboxImage.alt = images[currentImageIndex].alt;
        }
    }
}

function showPrevImage() {
    if (images.length > 0) {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        if (lightboxImage) {
            lightboxImage.src = images[currentImageIndex].src;
            lightboxImage.alt = images[currentImageIndex].alt;
        }
    }
}

if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
}

if (lightboxNext) {
    lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        showNextImage();
    });
}

if (lightboxPrev) {
    lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        showPrevImage();
    });
}

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (lightbox && lightbox.classList.contains('active')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNextImage();
        if (e.key === 'ArrowLeft') showPrevImage();
    }
});

// Form Submission with Validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn ? submitBtn.textContent : '';

        // Basic validation
        const name = document.getElementById('name')?.value.trim();
        const phone = document.getElementById('phone')?.value.trim();

        if (!name || !phone) {
            alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
            return;
        }

        // Phone validation
        const phoneRegex = /^[0-9]{10,11}$/;
        if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
            alert('Số điện thoại không hợp lệ!');
            return;
        }

        // Simulate form submission
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Đang gửi...';
        }

        setTimeout(() => {
            alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.\n\nThông tin của bạn:\n- Họ tên: ' + name + '\n- SĐT: ' + phone);
            contactForm.reset();
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        }, 1500);
    });
}

// Parallax Effect for Hero (subtle)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.getElementById('hero');
    if (hero && scrolled < window.innerHeight) {
        const heroBg = hero.querySelector('.hero-bg');
        if (heroBg) {
            heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    }
});

// Performance: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Virtual Tour Implementation using Photo Sphere Viewer
let viewer = null;
let currentRoom = 'living';
let isInitialized = false;

// Room configurations with panorama images and hotspots
const roomConfigs = {
    living: {
        panorama: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=2048&q=80',
        title: 'Phòng Khách Sang Trọng',
        description: 'Không gian rộng rãi, thiết kế hiện đại với view đẹp',
        hotspots: [
            { id: 'sofa', position: { yaw: 0.5, pitch: 0.1 }, tooltip: 'Bộ Sofa Cao Cấp', content: 'Bộ sofa nhập khẩu từ Ý, chất liệu da thật, thiết kế sang trọng' },
            { id: 'tv', position: { yaw: 2.5, pitch: 0.1 }, tooltip: 'TV 65 inch', content: 'Smart TV 65 inch 4K với hệ thống âm thanh vòm cao cấp' },
            { id: 'window', position: { yaw: 1.5, pitch: -0.3 }, tooltip: 'Cửa Sổ View Đẹp', content: 'Cửa sổ kính lớn với view thành phố và sông Sài Gòn tuyệt đẹp' }
        ]
    },
    bedroom: {
        panorama: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=2048&q=80',
        title: 'Phòng Ngủ Master',
        description: 'Không gian nghỉ ngơi yên tĩnh và thoải mái',
        hotspots: [
            { id: 'bed', position: { yaw: 0.2, pitch: 0.2 }, tooltip: 'Giường King Size', content: 'Giường king size với nệm cao cấp, đảm bảo giấc ngủ ngon' },
            { id: 'wardrobe', position: { yaw: 3.5, pitch: 0.1 }, tooltip: 'Tủ Quần Áo', content: 'Tủ quần áo tích hợp thông minh với hệ thống chiếu sáng LED' }
        ]
    },
    kitchen: {
        panorama: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=2048&q=80',
        title: 'Bếp Hiện Đại',
        description: 'Không gian bếp đầy đủ tiện nghi, thiết bị cao cấp',
        hotspots: [
            { id: 'island', position: { yaw: 0.8, pitch: 0.1 }, tooltip: 'Đảo Bếp', content: 'Đảo bếp đá granite với bồn rửa và vòi nước cao cấp' }
        ]
    },
    bathroom: {
        panorama: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=2048&q=80',
        title: 'Phòng Tắm Cao Cấp',
        description: 'Không gian thư giãn với thiết bị hiện đại',
        hotspots: [
            { id: 'shower', position: { yaw: 1.2, pitch: 0.1 }, tooltip: 'Vòi Sen Mưa', content: 'Vòi sen mưa với hệ thống massage, tạo cảm giác thư giãn tuyệt vời' }
        ]
    },
    balcony: {
        panorama: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=2048&q=80',
        title: 'Ban Công View Sông',
        description: 'Không gian ngoài trời với view panorama tuyệt đẹp',
        hotspots: [
            { id: 'view', position: { yaw: 1.5, pitch: -0.2 }, tooltip: 'View Sông Sài Gòn', content: 'Tầm nhìn rộng ra sông Sài Gòn và thành phố, view tuyệt đẹp mỗi ngày' }
        ]
    }
};

function initVirtualTour(room = 'living') {
    const config = roomConfigs[room];
    if (!config) return;
    
    const container = document.querySelector('#virtual-tour-viewer');
    if (!container) return;
    
    // Check if Photo Sphere Viewer is loaded - try multiple ways
    let PSV = null;
    let MarkersPlugin = null;
    
    // Try different ways to access PhotoSphereViewer
    if (window.PhotoSphereViewer) {
        PSV = window.PhotoSphereViewer;
    } else if (typeof PhotoSphereViewer !== 'undefined') {
        PSV = PhotoSphereViewer;
    }
    
    if (!PSV || !PSV.Viewer) {
        container.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100%;color:white;text-align:center;padding:2rem;font-size:1.1rem;">Đang tải Virtual Tour 360°...</div>';
        // Retry after a short delay
        setTimeout(() => {
            initVirtualTour(room);
        }, 1000);
        return;
    }
    
    // Get MarkersPlugin
    if (PSV.MarkersPlugin) {
        MarkersPlugin = PSV.MarkersPlugin;
    } else if (window.PhotoSphereViewer && window.PhotoSphereViewer.MarkersPlugin) {
        MarkersPlugin = window.PhotoSphereViewer.MarkersPlugin;
    }
    
    try {
        // Destroy existing viewer if any
        if (viewer) {
            try {
                viewer.destroy();
            } catch(e) {
                console.warn('Error destroying viewer:', e);
            }
            viewer = null;
        }
        
        // Create viewer options
        const viewerOptions = {
            container: container,
            panorama: config.panorama,
            caption: config.title,
            navbar: ['zoom', 'move', 'download', 'caption', 'fullscreen'],
            defaultZoomLvl: 50,
            minFov: 30,
            maxFov: 90
        };
        
        // Add markers plugin if available
        if (MarkersPlugin) {
            viewerOptions.plugins = [
                [
                    MarkersPlugin,
                    {
                        markers: config.hotspots.map(h => ({
                            id: h.id,
                            position: [h.position.yaw, h.position.pitch],
                            tooltip: h.tooltip,
                            html: `<div style="background:rgba(203,161,97,0.9);padding:0.5rem 1rem;border-radius:20px;color:white;font-weight:600;font-size:0.9rem;white-space:nowrap;">${h.tooltip}</div>`,
                            data: h
                        }))
                    }
                ]
            ];
        }
        
        // Create viewer
        viewer = new PSV.Viewer(viewerOptions);
        
        // Update UI
        const tourCurrentRoom = document.getElementById('tour-current-room');
        const tourCurrentDesc = document.getElementById('tour-current-desc');
        if (tourCurrentRoom) tourCurrentRoom.textContent = config.title;
        if (tourCurrentDesc) tourCurrentDesc.textContent = config.description;
        
        // Handle marker clicks
        if (MarkersPlugin && viewer) {
            try {
                const markersPlugin = viewer.getPlugin(MarkersPlugin);
                if (markersPlugin) {
                    markersPlugin.addEventListener('select-marker', (e) => {
                        const marker = e.marker || e;
                        if (marker && marker.config && marker.config.data) {
                            const data = marker.config.data;
                            const hotspotTitle = document.getElementById('hotspotTitle');
                            const hotspotDesc = document.getElementById('hotspotDesc');
                            const hotspotInfo = document.getElementById('hotspotInfo');
                            
                            if (hotspotTitle) hotspotTitle.textContent = data.tooltip;
                            if (hotspotDesc) hotspotDesc.textContent = data.content;
                            if (hotspotInfo) hotspotInfo.classList.add('active');
                        }
                    });
                }
            } catch (pluginError) {
                console.warn('Marker plugin error:', pluginError);
            }
        }
        
        currentRoom = room;
        isInitialized = true;
    } catch (error) {
        console.error('Virtual Tour Error:', error);
        container.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100%;color:white;text-align:center;padding:2rem;flex-direction:column;gap:1rem;"><div>Lỗi khi tải Virtual Tour.</div><div style="font-size:0.9rem;opacity:0.8;">Vui lòng thử lại sau hoặc làm mới trang.</div><div style="font-size:0.8rem;opacity:0.6;margin-top:0.5rem;">' + error.message + '</div></div>';
    }
}

// Initialize Virtual Tour when page loads
function initializeVirtualTourOnLoad() {
    const container = document.querySelector('#virtual-tour-viewer');
    if (!container) return;
    
    // Wait for Photo Sphere Viewer to load
    const checkLibrary = setInterval(() => {
        const PSV = window.PhotoSphereViewer || (typeof PhotoSphereViewer !== 'undefined' ? PhotoSphereViewer : null);
        if (PSV && PSV.Viewer) {
            clearInterval(checkLibrary);
            setTimeout(() => {
                initVirtualTour('living');
            }, 500);
        }
    }, 100);
    
    // Timeout after 10 seconds
    setTimeout(() => {
        clearInterval(checkLibrary);
        const PSV = window.PhotoSphereViewer || (typeof PhotoSphereViewer !== 'undefined' ? PhotoSphereViewer : null);
        if (!PSV || !PSV.Viewer) {
            container.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100%;color:white;text-align:center;padding:2rem;">Không thể tải Virtual Tour. Vui lòng kiểm tra kết nối mạng.</div>';
        }
    }, 10000);
}

// Close hotspot info panel
const closeHotspotInfo = document.getElementById('closeHotspotInfo');
if (closeHotspotInfo) {
    closeHotspotInfo.addEventListener('click', () => {
        const hotspotInfo = document.getElementById('hotspotInfo');
        if (hotspotInfo) {
            hotspotInfo.classList.remove('active');
        }
    });
}

// Room control buttons
document.querySelectorAll('.tour-control-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tour-control-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const room = btn.dataset.room;
        if (room) {
            initVirtualTour(room);
        }
    });
});

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeVirtualTourOnLoad);
} else {
    initializeVirtualTourOnLoad();
}

// Also initialize when the virtual tour section comes into view
const tourSection = document.getElementById('virtual-tour');
if (tourSection) {
    const tourObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !isInitialized) {
                const PSV = window.PhotoSphereViewer || (typeof PhotoSphereViewer !== 'undefined' ? PhotoSphereViewer : null);
                if (PSV && PSV.Viewer) {
                    setTimeout(() => {
                        if (!isInitialized) {
                            initVirtualTour('living');
                        }
                    }, 500);
                }
            }
        });
    }, { threshold: 0.1 });
    
    tourObserver.observe(tourSection);
}
