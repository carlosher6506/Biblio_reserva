document.addEventListener('DOMContentLoaded', () => {
    // Definir los menús permitidos por rol
    const menusByRole = {
        teacher: ['/dashboard', '/my-reservations', '/profile/edit', '/logout'],
        admin: ['/dashboard', '/reserve', '/reservations/manage', '/my-reservations', '/profile/edit', '/users/manage', '/logout'],
        superadmin: ['/dashboard', '/reserve', '/reservations/manage', '/my-reservations', '/profile/edit', '/users/manage', '/logout']
    };

    // Cargar datos del usuario
    fetch('/user', {
        method: 'GET',
        credentials: 'include',
        headers: { 'Accept': 'application/json' }
    })
    .then(res => {
        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
        return res.json();
    })
    .then(data => {
        console.log('Datos del usuario cargados:', data); // Depuración
        if (data) {
            // Actualizar nombre y foto del usuario
            const userNameSidebar = document.getElementById('user-name-sidebar');
            const userImgSidebar = document.getElementById('sidebar-user-img');
            if (userNameSidebar) {
                userNameSidebar.textContent = data.name || 'Usuario';
            }
            if (userImgSidebar && data.profileImage) {
                userImgSidebar.src = `${data.profileImage}?t=${new Date().getTime()}`;
            }

            // Filtrar menús según el rol
            const allowedMenus = menusByRole[data.role] || [];
            const navLinks = document.querySelectorAll('#sidebar .nav-link');
            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (!allowedMenus.includes(href)) {
                    link.parentElement.remove(); // Eliminar el enlace del DOM
                }
            });
        }
    })
    .catch(err => {
        console.error('Error cargando datos del usuario:', err.message);
    });

    // Manejo del toggle del sidebar
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const sidebarToggle = document.getElementById('sidebarToggle');

    if (sidebarToggle && sidebar && overlay) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('d-none');
            overlay.classList.toggle('d-none');
        });

        overlay.addEventListener('click', () => {
            sidebar.classList.add('d-none');
            overlay.classList.add('d-none');
        });
    }
});