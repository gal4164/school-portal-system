const API_BASE = '/api';
let currentUser = null;
let token = localStorage.getItem('token');

// Check authentication
if (!token) {
    window.location.href = '/login';
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', async () => {
    await loadCurrentUser();
    setupSidebar();
    loadDashboard();
    loadNotificationCount();
    
    document.getElementById('logoutBtn').addEventListener('click', logout);
});

async function loadCurrentUser() {
    try {
        const response = await apiCall('/auth/me');
        if (response.success) {
            currentUser = response.user;
            document.getElementById('userInfo').textContent = 
                `${currentUser.first_name} ${currentUser.last_name} (${currentUser.role})`;
            
            // Set data-role attribute for CSS styling
            document.body.setAttribute('data-role', currentUser.role);
        }
    } catch (error) {
        console.error('Error loading user:', error);
        logout();
    }
}

function setupSidebar() {
    const sidebar = document.getElementById('sidebarMenu');
    let menuItems = [
        { name: 'Dashboard', section: 'dashboard', roles: ['admin', 'teacher', 'student'] }
    ];

    if (currentUser.role === 'admin') {
        menuItems.push(
            { name: 'Teachers', section: 'teachers', roles: ['admin'] },
            { name: 'Students', section: 'students', roles: ['admin'] },
            { name: 'Classes', section: 'classes', roles: ['admin'] },
            { name: 'Announcements', section: 'announcements', roles: ['admin'] }
        );
    } else if (currentUser.role === 'teacher') {
        menuItems.push(
            { name: 'My Classes', section: 'classes', roles: ['teacher'] },
            { name: 'Messages', section: 'messages', roles: ['teacher'] },
            { name: 'Assignments', section: 'assignments', roles: ['teacher'] },
            { name: 'Announcements', section: 'announcements', roles: ['teacher'] }
        );
    } else if (currentUser.role === 'student') {
        menuItems.push(
            { name: 'My Classes', section: 'classes', roles: ['student'] },
            { name: 'Messages', section: 'messages', roles: ['student'] },
            { name: 'Assignments', section: 'assignments', roles: ['student'] },
            { name: 'Announcements', section: 'announcements', roles: ['student'] }
        );
    }

    menuItems.push({ name: 'Notifications', section: 'notifications', roles: ['admin', 'teacher', 'student'] });

    sidebar.innerHTML = menuItems.map(item => `
        <li class="nav-item">
            <a class="nav-link" href="#" data-section="${item.section}">
                ${item.name}
            </a>
        </li>
    `).join('');

    sidebar.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            sidebar.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            const section = link.dataset.section;
            loadSection(section);
        });
    });
}

async function loadSection(section) {
    document.getElementById('pageTitle').textContent = 
        section.charAt(0).toUpperCase() + section.slice(1);
    
    const mainContent = document.getElementById('mainContent');
    
    switch(section) {
        case 'dashboard':
            await loadDashboard();
            break;
        case 'teachers':
            await loadTeachers();
            break;
        case 'students':
            await loadStudents();
            break;
        case 'classes':
            await loadClasses();
            break;
        case 'messages':
            await loadMessages();
            break;
        case 'assignments':
            await loadAssignments();
            break;
        case 'announcements':
            await loadAnnouncements();
            break;
        case 'notifications':
            await loadNotifications();
            break;
    }
}

async function loadDashboard() {
    const endpoint = `/${currentUser.role}/dashboard`;
    try {
        const data = await apiCall(endpoint);
        const mainContent = document.getElementById('mainContent');
        
        if (currentUser.role === 'admin') {
            mainContent.innerHTML = `
                <div class="row g-4">
                    <div class="col-md-3">
                        <div class="card stat-card">
                            <div class="card-body">
                                <h5 class="card-title">Teachers</h5>
                                <h2>${data.stats.teachers}</h2>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card stat-card">
                            <div class="card-body">
                                <h5 class="card-title">Students</h5>
                                <h2>${data.stats.students}</h2>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card stat-card">
                            <div class="card-body">
                                <h5 class="card-title">Classes</h5>
                                <h2>${data.stats.classes}</h2>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card stat-card">
                            <div class="card-body">
                                <h5 class="card-title">Messages</h5>
                                <h2>${data.stats.messages}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else if (currentUser.role === 'teacher') {
            mainContent.innerHTML = `
                <div class="row g-4 mb-4">
                    <div class="col-md-4">
                        <div class="card stat-card">
                            <div class="card-body">
                                <h5 class="card-title">My Classes</h5>
                                <h2>${data.stats.classes}</h2>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card stat-card">
                            <div class="card-body">
                                <h5 class="card-title">Unread Messages</h5>
                                <h2>${data.stats.unreadMessages}</h2>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card stat-card">
                            <div class="card-body">
                                <h5 class="card-title">Assignments</h5>
                                <h2>${data.stats.assignments}</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <h4>My Classes</h4>
                <div class="row g-3">
                    ${data.classes.map(cls => `
                        <div class="col-md-4">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">${cls.name}</h5>
                                    <p class="card-text">
                                        Grade: ${cls.grade_level || 'N/A'}<br>
                                        Students: ${cls.student_count}
                                    </p>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        } else if (currentUser.role === 'student') {
            mainContent.innerHTML = `
                <div class="row g-4 mb-4">
                    <div class="col-md-4">
                        <div class="card stat-card">
                            <div class="card-body">
                                <h5 class="card-title">My Classes</h5>
                                <h2>${data.stats.classes}</h2>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card stat-card">
                            <div class="card-body">
                                <h5 class="card-title">Unread Messages</h5>
                                <h2>${data.stats.unreadMessages}</h2>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card stat-card">
                            <div class="card-body">
                                <h5 class="card-title">Pending Assignments</h5>
                                <h2>${data.stats.pendingAssignments}</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <h4>My Classes</h4>
                <div class="row g-3">
                    ${data.classes.map(cls => `
                        <div class="col-md-4">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">${cls.name}</h5>
                                    <p class="card-text">
                                        Teacher: ${cls.teacher_first_name} ${cls.teacher_last_name}<br>
                                        Subject: ${cls.subject || 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }
    } catch (error) {
        showAlert('Error loading dashboard', 'danger');
    }
}

async function loadMessages() {
    try {
        const inbox = await apiCall('/messages/inbox');
        const mainContent = document.getElementById('mainContent');
        
        mainContent.innerHTML = `
            <div class="mb-3">
                <button class="btn btn-primary" onclick="showComposeMessage()">Compose Message</button>
            </div>
            <div class="card">
                <div class="card-header">
                    <ul class="nav nav-tabs card-header-tabs">
                        <li class="nav-item">
                            <a class="nav-link active" href="#" onclick="loadMessages(); return false;">Inbox</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" onclick="loadSentMessages(); return false;">Sent</a>
                        </li>
                    </ul>
                </div>
                <div class="card-body">
                    ${inbox.messages.length === 0 ? '<p>No messages</p>' : 
                        inbox.messages.map(msg => `
                            <div class="message-item p-3 mb-2 ${msg.is_read ? '' : 'unread'}" style="cursor: pointer;" onclick="viewMessage(${msg.id})">
                                <div class="d-flex justify-content-between">
                                    <strong>${msg.sender_first_name} ${msg.sender_last_name}</strong>
                                    <small>${new Date(msg.created_at).toLocaleString()}</small>
                                </div>
                                <div><strong>${msg.subject || 'No Subject'}</strong></div>
                                <div>${msg.message.substring(0, 100)}${msg.message.length > 100 ? '...' : ''}</div>
                            </div>
                        `).join('')
                    }
                </div>
            </div>
        `;
    } catch (error) {
        showAlert('Error loading messages', 'danger');
    }
}

async function loadSentMessages() {
    try {
        const sent = await apiCall('/messages/sent');
        const mainContent = document.getElementById('mainContent');
        
        mainContent.innerHTML = `
            <div class="mb-3">
                <button class="btn btn-primary" onclick="showComposeMessage()">Compose Message</button>
            </div>
            <div class="card">
                <div class="card-header">
                    <ul class="nav nav-tabs card-header-tabs">
                        <li class="nav-item">
                            <a class="nav-link" href="#" onclick="loadMessages(); return false;">Inbox</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" href="#" onclick="loadSentMessages(); return false;">Sent</a>
                        </li>
                    </ul>
                </div>
                <div class="card-body">
                    ${sent.messages.length === 0 ? '<p>No sent messages</p>' : 
                        sent.messages.map(msg => `
                            <div class="message-item p-3 mb-2">
                                <div class="d-flex justify-content-between">
                                    <strong>To: ${msg.receiver_first_name || 'Class'} ${msg.receiver_last_name || msg.class_name || ''}</strong>
                                    <small>${new Date(msg.created_at).toLocaleString()}</small>
                                </div>
                                <div><strong>${msg.subject || 'No Subject'}</strong></div>
                                <div>${msg.message.substring(0, 100)}${msg.message.length > 100 ? '...' : ''}</div>
                            </div>
                        `).join('')
                    }
                </div>
            </div>
        `;
    } catch (error) {
        showAlert('Error loading sent messages', 'danger');
    }
}

async function viewMessage(messageId) {
    try {
        await apiCall(`/messages/${messageId}/read`, 'PATCH');
        loadMessages();
        loadNotificationCount();
    } catch (error) {
        console.error('Error marking message as read:', error);
    }
}

async function loadAssignments() {
    const endpoint = currentUser.role === 'teacher' ? '/teacher/assignments' : '/student/assignments';
    try {
        const data = await apiCall(endpoint);
        const mainContent = document.getElementById('mainContent');
        
        if (currentUser.role === 'teacher') {
            mainContent.innerHTML = `
                <div class="mb-3">
                    <button class="btn btn-primary" onclick="showCreateAssignment()">Create Assignment</button>
                </div>
                <div class="row g-3">
                    ${data.assignments.map(assignment => {
                        const hasAttachment = assignment.attachment_path && assignment.attachment_path.trim() !== '';
                        return `
                            <div class="col-md-6">
                                <div class="card assignment-card">
                                    <div class="card-body">
                                        <h5 class="card-title">${assignment.title}</h5>
                                        <p class="card-text">${assignment.description || ''}</p>
                                        <small>Class: ${assignment.class_name}</small><br>
                                        <small>Due: ${assignment.due_date ? new Date(assignment.due_date).toLocaleString() : 'No due date'}</small><br>
                                        <small>Submissions: ${assignment.submission_count}</small><br>
                                        ${hasAttachment ? 
                                            `<div class="mt-2">
                                                <a href="/${assignment.attachment_path}" target="_blank" class="btn btn-sm btn-outline-secondary">
                                                    <i class="bi bi-file-earmark"></i> View Attached File
                                                </a>
                                            </div>` : 
                                            ''
                                        }
                                        <button class="btn btn-sm btn-info mt-2" onclick="viewAssignmentSubmissions(${assignment.id})">View Submissions</button>
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
        } else {
            mainContent.innerHTML = `
                <div class="row g-3">
                    ${data.assignments.map(assignment => {
                        const isSubmitted = assignment.submission_id !== null;
                        const isOverdue = assignment.due_date && new Date(assignment.due_date) < new Date();
                        const hasAttachment = assignment.attachment_path && assignment.attachment_path.trim() !== '';
                        return `
                            <div class="col-md-6">
                                <div class="card assignment-card ${isSubmitted ? 'submitted' : isOverdue ? 'overdue' : ''}">
                                    <div class="card-body">
                                        <h5 class="card-title">${assignment.title}</h5>
                                        <p class="card-text">${assignment.description || ''}</p>
                                        <small>Class: ${assignment.class_name}</small><br>
                                        <small>Teacher: ${assignment.teacher_first_name} ${assignment.teacher_last_name}</small><br>
                                        <small>Due: ${assignment.due_date ? new Date(assignment.due_date).toLocaleString() : 'No due date'}</small><br>
                                        ${hasAttachment ? 
                                            `<div class="mt-2">
                                                <a href="/${assignment.attachment_path}" target="_blank" class="btn btn-sm btn-outline-primary">
                                                    <i class="bi bi-file-earmark-pdf"></i> View Assignment File
                                                </a>
                                            </div>` : 
                                            ''
                                        }
                                        <div class="mt-2">
                                            ${isSubmitted ? 
                                                `<span class="badge bg-success">Submitted on ${new Date(assignment.submitted_at).toLocaleString()}</span>` :
                                                `<button class="btn btn-sm btn-primary" onclick="showSubmitAssignment(${assignment.id})">Submit Assignment</button>`
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
        }
    } catch (error) {
        showAlert('Error loading assignments', 'danger');
    }
}

async function loadAnnouncements() {
    let endpoint = '/student/announcements';
    
    if (currentUser.role === 'admin') {
        endpoint = '/admin/announcements';
    } else if (currentUser.role === 'teacher') {
        endpoint = '/teacher/announcements';
    }
    
    try {
        const data = await apiCall(endpoint);
        const mainContent = document.getElementById('mainContent');
        
        mainContent.innerHTML = `
            ${currentUser.role !== 'student' ? '<button class="btn btn-primary mb-3" onclick="showCreateAnnouncement()">Create Announcement</button>' : ''}
            <div class="list-group">
                ${(data.announcements || []).map(announcement => `
                    <div class="list-group-item">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">${announcement.title}</h5>
                            <small>${new Date(announcement.created_at).toLocaleString()}</small>
                        </div>
                        <p class="mb-1">${announcement.content}</p>
                        <small>By: ${announcement.first_name} ${announcement.last_name}</small>
                    </div>
                `).join('')}
            </div>
        `;
    } catch (error) {
        showAlert('Error loading announcements', 'danger');
    }
}

async function loadNotifications() {
    try {
        const data = await apiCall('/notifications');
        const mainContent = document.getElementById('mainContent');
        
        mainContent.innerHTML = `
            <div class="mb-3">
                <button class="btn btn-sm btn-secondary" onclick="markAllNotificationsRead()">Mark All as Read</button>
            </div>
            <div class="list-group">
                ${data.notifications.map(notif => `
                    <div class="notification-item ${notif.is_read ? '' : 'unread'}">
                        <div class="d-flex justify-content-between">
                            <strong>${notif.title}</strong>
                            <small>${new Date(notif.created_at).toLocaleString()}</small>
                        </div>
                        <div>${notif.message}</div>
                        ${!notif.is_read ? `<button class="btn btn-sm btn-link" onclick="markNotificationRead(${notif.id})">Mark as Read</button>` : ''}
                    </div>
                `).join('')}
            </div>
        `;
    } catch (error) {
        showAlert('Error loading notifications', 'danger');
    }
}

async function loadNotificationCount() {
    try {
        const data = await apiCall('/notifications/unread-count');
        document.getElementById('notificationBadge').textContent = data.count;
    } catch (error) {
        console.error('Error loading notification count');
    }
}

async function markNotificationRead(id) {
    try {
        await apiCall(`/notifications/${id}/read`, 'PATCH');
        loadNotifications();
        loadNotificationCount();
    } catch (error) {
        showAlert('Error marking notification as read', 'danger');
    }
}

async function markAllNotificationsRead() {
    try {
        await apiCall('/notifications/read-all', 'PATCH');
        loadNotifications();
        loadNotificationCount();
    } catch (error) {
        showAlert('Error marking notifications as read', 'danger');
    }
}

async function apiCall(endpoint, method = 'GET', body = null) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };
    
    if (body) {
        options.body = JSON.stringify(body);
    }
    
    const response = await fetch(`${API_BASE}${endpoint}`, options);
    
    if (response.status === 401) {
        logout();
        return;
    }
    
    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.error || 'Request failed');
    }
    
    return data;
}

function showAlert(message, type) {
    const alertContainer = document.getElementById('alertContainer');
    alertContainer.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    setTimeout(() => {
        alertContainer.innerHTML = '';
    }, 5000);
}

async function logout() {
    try {
        await fetch('/api/auth/logout', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error('Logout error:', error);
    }
    
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
}

// Modal functions
function showRegisterTeacher() {
    const modal = `
        <div class="modal fade" id="registerTeacherModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Register Teacher</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="registerTeacherForm">
                            <div class="mb-3">
                                <label class="form-label">Email *</label>
                                <input type="email" class="form-control" name="email" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Password *</label>
                                <input type="password" class="form-control" name="password" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">First Name *</label>
                                <input type="text" class="form-control" name="first_name" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Last Name *</label>
                                <input type="text" class="form-control" name="last_name" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Phone</label>
                                <input type="tel" class="form-control" name="phone">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" onclick="submitRegisterTeacher()">Register</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modal);
    const modalEl = new bootstrap.Modal(document.getElementById('registerTeacherModal'));
    modalEl.show();
    document.getElementById('registerTeacherModal').addEventListener('hidden.bs.modal', function () {
        this.remove();
    });
}

async function submitRegisterTeacher() {
    const form = document.getElementById('registerTeacherForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    try {
        const response = await apiCall('/admin/teachers', 'POST', data);
        bootstrap.Modal.getInstance(document.getElementById('registerTeacherModal')).hide();
        showAlert('Teacher registered successfully!', 'success');
        loadTeachers();
    } catch (error) {
        showAlert(error.message || 'Failed to register teacher', 'danger');
    }
}

function showRegisterStudent() {
    const modal = `
        <div class="modal fade" id="registerStudentModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Register Student</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="registerStudentForm">
                            <div class="mb-3">
                                <label class="form-label">Email *</label>
                                <input type="email" class="form-control" name="email" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Password *</label>
                                <input type="password" class="form-control" name="password" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">First Name *</label>
                                <input type="text" class="form-control" name="first_name" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Last Name *</label>
                                <input type="text" class="form-control" name="last_name" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Phone</label>
                                <input type="tel" class="form-control" name="phone">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" onclick="submitRegisterStudent()">Register</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modal);
    const modalEl = new bootstrap.Modal(document.getElementById('registerStudentModal'));
    modalEl.show();
    document.getElementById('registerStudentModal').addEventListener('hidden.bs.modal', function () {
        this.remove();
    });
}

async function submitRegisterStudent() {
    const form = document.getElementById('registerStudentForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    try {
        const response = await apiCall('/admin/students', 'POST', data);
        bootstrap.Modal.getInstance(document.getElementById('registerStudentModal')).hide();
        showAlert('Student registered successfully!', 'success');
        loadStudents();
    } catch (error) {
        showAlert(error.message || 'Failed to register student', 'danger');
    }
}

function showCreateClass() {
    const modal = `
        <div class="modal fade" id="createClassModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Create Class</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="createClassForm">
                            <div class="mb-3">
                                <label class="form-label">Class Name *</label>
                                <input type="text" class="form-control" name="name" placeholder="e.g., Mathematics 10A" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Grade Level</label>
                                <input type="text" class="form-control" name="grade_level" placeholder="e.g., 10th Grade">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Section</label>
                                <input type="text" class="form-control" name="section" placeholder="e.g., A">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Academic Year</label>
                                <input type="text" class="form-control" name="academic_year" placeholder="e.g., 2024-2025">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" onclick="submitCreateClass()">Create</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modal);
    const modalEl = new bootstrap.Modal(document.getElementById('createClassModal'));
    modalEl.show();
    document.getElementById('createClassModal').addEventListener('hidden.bs.modal', function () {
        this.remove();
    });
}

async function submitCreateClass() {
    const form = document.getElementById('createClassForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    try {
        const response = await apiCall('/admin/classes', 'POST', data);
        bootstrap.Modal.getInstance(document.getElementById('createClassModal')).hide();
        showAlert('Class created successfully!', 'success');
        loadClasses();
    } catch (error) {
        showAlert(error.message || 'Failed to create class', 'danger');
    }
}

async function showComposeMessage() {
    try {
        let recipientOptions = '';
        let messageTypeField = '';
        
        if (currentUser.role === 'teacher') {
            // Teachers can send to students (private) or classes (group)
            const classesData = await apiCall('/teacher/classes');
            
            recipientOptions = `
                <div class="mb-3">
                    <label class="form-label">Message Type *</label>
                    <select class="form-select" id="messageType" required>
                        <option value="">Select Type</option>
                        <option value="students">Message to Student(s)</option>
                        <option value="group">Group Message (Entire Class)</option>
                    </select>
                </div>
                <div class="mb-3" id="studentsField" style="display: none;">
                    <label class="form-label">Select Student(s) *</label>
                    <div id="studentCheckboxList" class="border rounded p-3" style="max-height: 250px; overflow-y: auto;">
                        <p class="text-muted">Loading students...</p>
                    </div>
                    <small class="text-muted">Select one or more students to send message</small>
                </div>
                <div class="mb-3" id="classField" style="display: none;">
                    <label class="form-label">Class *</label>
                    <select class="form-select" name="class_id" id="classSelect" required>
                        <option value="">Loading...</option>
                    </select>
                </div>
            `;
            
            // Store classes data for later use
            window.teacherClasses = classesData.classes;
            
        } else if (currentUser.role === 'student') {
            // Students can only send private messages to their teachers
            const teachersData = await apiCall('/student/teachers');
            
            recipientOptions = `
                <div class="mb-3">
                    <label class="form-label">Teacher *</label>
                    <select class="form-select" name="teacher_id" required>
                        <option value="">Select Teacher</option>
                        ${teachersData.teachers.map(t => 
                            `<option value="${t.id}">${t.first_name} ${t.last_name} - ${t.subject || 'N/A'}</option>`
                        ).join('')}
                    </select>
                </div>
            `;
        }
        
        const modal = `
            <div class="modal fade" id="composeMessageModal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Compose Message</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <form id="composeMessageForm">
                                ${recipientOptions}
                                <div class="mb-3">
                                    <label class="form-label">Subject</label>
                                    <input type="text" class="form-control" name="subject" placeholder="Message subject">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Message *</label>
                                    <textarea class="form-control" name="message" rows="5" placeholder="Type your message here..." required></textarea>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary" onclick="submitComposeMessage()">Send Message</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modal);
        const modalEl = new bootstrap.Modal(document.getElementById('composeMessageModal'));
        modalEl.show();
        
        // Add event listener for message type change (for teachers)
        if (currentUser.role === 'teacher') {
            document.getElementById('messageType').addEventListener('change', updateRecipientOptions);
        }
        
        document.getElementById('composeMessageModal').addEventListener('hidden.bs.modal', function () {
            this.remove();
        });
        
    } catch (error) {
        showAlert('Error loading compose message: ' + error.message, 'danger');
    }
}

async function updateRecipientOptions() {
    const messageType = document.getElementById('messageType').value;
    const studentsField = document.getElementById('studentsField');
    const classField = document.getElementById('classField');
    
    if (!messageType) {
        if (studentsField) studentsField.style.display = 'none';
        if (classField) classField.style.display = 'none';
        return;
    }
    
    // Hide both fields initially
    if (studentsField) studentsField.style.display = 'none';
    if (classField) classField.style.display = 'none';
    
    if (messageType === 'students') {
        studentsField.style.display = 'block';
        const studentCheckboxList = document.getElementById('studentCheckboxList');
        studentCheckboxList.innerHTML = '<p class="text-muted">Loading students...</p>';
        
        // Load students from teacher's classes
        try {
            const classes = window.teacherClasses || [];
            
            if (classes.length === 0) {
                studentCheckboxList.innerHTML = '<p class="text-muted">No classes assigned</p>';
                showAlert('You are not assigned to any classes yet. Please contact admin.', 'warning');
                return;
            }
            
            const studentIds = new Set();
            const students = [];
            
            for (const cls of classes) {
                try {
                    const studentsData = await apiCall(`/teacher/classes/${cls.id}/students`);
                    studentsData.students.forEach(student => {
                        if (!studentIds.has(student.id)) {
                            studentIds.add(student.id);
                            students.push(student);
                        }
                    });
                } catch (error) {
                    console.error(`Error loading students for class ${cls.id}:`, error);
                }
            }
            
            if (students.length === 0) {
                studentCheckboxList.innerHTML = '<p class="text-muted">No students enrolled in your classes</p>';
                showAlert('No students are enrolled in your classes yet. Please contact admin to enroll students.', 'warning');
                return;
            }
            
            students.sort((a, b) => {
                const nameA = `${a.last_name} ${a.first_name}`.toLowerCase();
                const nameB = `${b.last_name} ${b.first_name}`.toLowerCase();
                return nameA.localeCompare(nameB);
            });
            
            // Create checkboxes for each student
            studentCheckboxList.innerHTML = `
                <div class="form-check mb-2">
                    <input class="form-check-input" type="checkbox" id="selectAllStudents" onchange="toggleAllStudents(this)">
                    <label class="form-check-label fw-bold" for="selectAllStudents">
                        Select All (${students.length} students)
                    </label>
                </div>
                <hr class="my-2">
                ${students.map(s => `
                    <div class="form-check mb-2">
                        <input class="form-check-input student-checkbox" type="checkbox" value="${s.id}" id="student_${s.id}">
                        <label class="form-check-label" for="student_${s.id}">
                            ${s.first_name} ${s.last_name} <small class="text-muted">(${s.email})</small>
                        </label>
                    </div>
                `).join('')}
            `;
                
        } catch (error) {
            studentCheckboxList.innerHTML = '<p class="text-danger">Error loading students</p>';
            showAlert('Error loading students: ' + error.message, 'danger');
        }
        
    } else if (messageType === 'group') {
        classField.style.display = 'block';
        const classSelect = document.getElementById('classSelect');
        classSelect.disabled = false;
        classSelect.innerHTML = '<option value="">Loading...</option>';
        
        const classes = window.teacherClasses || [];
        
        if (classes.length === 0) {
            classSelect.innerHTML = '<option value="">No classes assigned</option>';
            classSelect.disabled = true;
            showAlert('You are not assigned to any classes yet. Please contact admin.', 'warning');
            return;
        }
        
        classSelect.disabled = false;
        classSelect.innerHTML = '<option value="">Select Class</option>' +
            classes.map(c => 
                `<option value="${c.id}">${c.name}</option>`
            ).join('');
    }
}

function toggleAllStudents(checkbox) {
    const studentCheckboxes = document.querySelectorAll('.student-checkbox');
    studentCheckboxes.forEach(cb => {
        cb.checked = checkbox.checked;
    });
}

async function submitComposeMessage() {
    const form = document.getElementById('composeMessageForm');
    const formData = new FormData(form);
    
    try {
        let endpoint = '';
        let data = {
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        if (currentUser.role === 'teacher') {
            const messageType = document.getElementById('messageType').value;
            
            if (!messageType) {
                showAlert('Please select a message type', 'warning');
                return;
            }
            
            if (messageType === 'students') {
                // Get all checked students
                const checkedStudents = document.querySelectorAll('.student-checkbox:checked');
                
                if (checkedStudents.length === 0) {
                    showAlert('Please select at least one student', 'warning');
                    return;
                }
                
                const studentIds = Array.from(checkedStudents).map(cb => parseInt(cb.value));
                
                // Send message to each selected student
                let successCount = 0;
                let failCount = 0;
                
                for (const studentId of studentIds) {
                    try {
                        await apiCall('/teacher/messages', 'POST', {
                            receiver_id: studentId,
                            subject: data.subject,
                            message: data.message
                        });
                        successCount++;
                    } catch (error) {
                        console.error(`Failed to send message to student ${studentId}:`, error);
                        failCount++;
                    }
                }
                
                bootstrap.Modal.getInstance(document.getElementById('composeMessageModal')).hide();
                
                if (failCount === 0) {
                    if (successCount === 1) {
                        showAlert('Message sent successfully!', 'success');
                    } else {
                        showAlert(`Message sent successfully to ${successCount} students!`, 'success');
                    }
                } else {
                    showAlert(`Message sent to ${successCount} student(s), but failed for ${failCount} student(s)`, 'warning');
                }
                
                loadMessages();
                return; // Exit early since we handled everything
                
            } else if (messageType === 'group') {
                endpoint = '/teacher/messages/group';
                const classSelect = document.getElementById('classSelect');
                data.class_id = parseInt(classSelect.value);
                
                if (!data.class_id || isNaN(data.class_id)) {
                    showAlert('Please select a class from the dropdown', 'warning');
                    return;
                }
            }
            
        } else if (currentUser.role === 'student') {
            endpoint = '/student/messages';
            data.teacher_id = parseInt(formData.get('teacher_id'));
            
            if (!data.teacher_id || isNaN(data.teacher_id)) {
                showAlert('Please select a teacher', 'warning');
                return;
            }
        }
        
        if (!data.message || data.message.trim() === '') {
            showAlert('Please enter a message', 'warning');
            return;
        }
        
        await apiCall(endpoint, 'POST', data);
        bootstrap.Modal.getInstance(document.getElementById('composeMessageModal')).hide();
        showAlert('Message sent successfully!', 'success');
        loadMessages();
        
    } catch (error) {
        showAlert(error.message || 'Failed to send message', 'danger');
    }
}

async function showCreateAssignment() {
    try {
        // Load teacher's classes
        const classesData = await apiCall('/teacher/classes');
        
        if (classesData.classes.length === 0) {
            showAlert('You are not assigned to any classes yet. Please contact admin.', 'warning');
            return;
        }
        
        const modal = `
            <div class="modal fade" id="createAssignmentModal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Create Assignment</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <form id="createAssignmentForm">
                                <div class="mb-3">
                                    <label class="form-label">Class *</label>
                                    <select class="form-select" name="class_id" required>
                                        <option value="">Select Class</option>
                                        ${classesData.classes.map(c => 
                                            `<option value="${c.id}">${c.name}</option>`
                                        ).join('')}
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Title *</label>
                                    <input type="text" class="form-control" name="title" placeholder="Assignment title" required>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Description</label>
                                    <textarea class="form-control" name="description" rows="4" placeholder="Assignment description and instructions"></textarea>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Due Date</label>
                                    <input type="datetime-local" class="form-control" name="due_date">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Attachment (Optional)</label>
                                    <input type="file" class="form-control" name="attachment" accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png">
                                    <small class="text-muted">Supported: PDF, DOC, DOCX, TXT, JPG, PNG</small>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary" onclick="submitCreateAssignment()">Create Assignment</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modal);
        const modalEl = new bootstrap.Modal(document.getElementById('createAssignmentModal'));
        modalEl.show();
        document.getElementById('createAssignmentModal').addEventListener('hidden.bs.modal', function () {
            this.remove();
        });
        
    } catch (error) {
        showAlert('Error loading create assignment: ' + error.message, 'danger');
    }
}

async function submitCreateAssignment() {
    const form = document.getElementById('createAssignmentForm');
    const formData = new FormData(form);
    
    const classId = formData.get('class_id');
    const title = formData.get('title');
    
    if (!classId) {
        showAlert('Please select a class', 'warning');
        return;
    }
    
    if (!title || title.trim() === '') {
        showAlert('Please enter an assignment title', 'warning');
        return;
    }
    
    try {
        // For file upload, we need to use FormData directly
        const response = await fetch(`${API_BASE}/teacher/assignments`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to create assignment');
        }
        
        bootstrap.Modal.getInstance(document.getElementById('createAssignmentModal')).hide();
        showAlert('Assignment created successfully!', 'success');
        loadAssignments();
        
    } catch (error) {
        showAlert(error.message || 'Failed to create assignment', 'danger');
    }
}

async function showSubmitAssignment(assignmentId) {
    try {
        // Get assignment details
        const assignments = await apiCall('/student/assignments');
        const assignment = assignments.assignments.find(a => a.id === assignmentId);
        
        if (!assignment) {
            showAlert('Assignment not found', 'danger');
            return;
        }
        
        const hasAttachment = assignment.attachment_path && assignment.attachment_path.trim() !== '';
        
        const modal = `
            <div class="modal fade" id="submitAssignmentModal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Submit Assignment</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <h6>${assignment.title}</h6>
                                <p class="text-muted">${assignment.description || 'No description'}</p>
                                <small><strong>Class:</strong> ${assignment.class_name}</small><br>
                                <small><strong>Teacher:</strong> ${assignment.teacher_first_name} ${assignment.teacher_last_name}</small><br>
                                ${assignment.due_date ? `<small><strong>Due:</strong> ${new Date(assignment.due_date).toLocaleString()}</small><br>` : ''}
                                ${hasAttachment ? 
                                    `<div class="mt-2">
                                        <a href="/${assignment.attachment_path}" target="_blank" class="btn btn-sm btn-primary">
                                            <i class="bi bi-file-earmark-pdf"></i> View Assignment File (PDF/Document)
                                        </a>
                                    </div>` : 
                                    '<small class="text-muted">No attachment provided by teacher</small>'
                                }
                            </div>
                            <hr>
                            <form id="submitAssignmentForm">
                                <input type="hidden" name="assignment_id" value="${assignmentId}">
                                <div class="mb-3">
                                    <label class="form-label">Your Response</label>
                                    <textarea class="form-control" name="content" rows="6" placeholder="Type your answer or notes here..."></textarea>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Your Attachment (Optional)</label>
                                    <input type="file" class="form-control" name="attachment" accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png">
                                    <small class="text-muted">Supported: PDF, DOC, DOCX, TXT, JPG, PNG</small>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary" onclick="submitAssignmentSubmission()">Submit Assignment</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modal);
        const modalEl = new bootstrap.Modal(document.getElementById('submitAssignmentModal'));
        modalEl.show();
        document.getElementById('submitAssignmentModal').addEventListener('hidden.bs.modal', function () {
            this.remove();
        });
        
    } catch (error) {
        showAlert('Error loading assignment: ' + error.message, 'danger');
    }
}

async function submitAssignmentSubmission() {
    const form = document.getElementById('submitAssignmentForm');
    const formData = new FormData(form);
    
    try {
        // For file upload, we need to use FormData directly
        const response = await fetch(`${API_BASE}/student/assignments/submit`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to submit assignment');
        }
        
        bootstrap.Modal.getInstance(document.getElementById('submitAssignmentModal')).hide();
        showAlert('Assignment submitted successfully!', 'success');
        loadAssignments();
        
    } catch (error) {
        showAlert(error.message || 'Failed to submit assignment', 'danger');
    }
}

async function showCreateAnnouncement() {
    try {
        let targetOptions = '';
        
        if (currentUser.role === 'admin') {
            // Admin can post to all, students, teachers, or specific class
            const classesData = await apiCall('/admin/classes');
            
            targetOptions = `
                <div class="mb-3">
                    <label class="form-label">Target Audience *</label>
                    <select class="form-select" id="targetAudience" required>
                        <option value="all">Everyone (All Users)</option>
                        <option value="students">All Students</option>
                        <option value="teachers">All Teachers</option>
                        <option value="class">Specific Class</option>
                    </select>
                </div>
                <div class="mb-3" id="classField" style="display: none;">
                    <label class="form-label">Select Class *</label>
                    <select class="form-select" name="class_id" id="classSelect">
                        <option value="">Select Class</option>
                        ${classesData.classes.map(c => 
                            `<option value="${c.id}">${c.name}</option>`
                        ).join('')}
                    </select>
                </div>
            `;
            
        } else if (currentUser.role === 'teacher') {
            // Teacher can post to individual students, entire class, or multiple classes
            const classesData = await apiCall('/teacher/classes');
            
            if (classesData.classes.length === 0) {
                showAlert('You are not assigned to any classes yet. Please contact admin.', 'warning');
                return;
            }
            
            // Store classes for later use
            window.teacherClassesForAnnouncement = classesData.classes;
            
            targetOptions = `
                <div class="mb-3">
                    <label class="form-label">Announcement For *</label>
                    <select class="form-select" id="announcementTarget" required>
                        <option value="">Select Target</option>
                        <option value="students">Individual Student(s)</option>
                        <option value="class">Entire Class</option>
                        <option value="multiple_classes">Multiple Classes</option>
                    </select>
                </div>
                <div class="mb-3" id="studentsAnnouncementField" style="display: none;">
                    <label class="form-label">Select Student(s) *</label>
                    <div id="studentAnnouncementCheckboxList" class="border rounded p-3" style="max-height: 250px; overflow-y: auto;">
                        <p class="text-muted">Loading students...</p>
                    </div>
                    <small class="text-muted">Select one or more students</small>
                </div>
                <div class="mb-3" id="classAnnouncementField" style="display: none;">
                    <label class="form-label">Select Class *</label>
                    <select class="form-select" id="classAnnouncementSelect">
                        <option value="">Select Class</option>
                        ${classesData.classes.map(c => 
                            `<option value="${c.id}">${c.name}</option>`
                        ).join('')}
                    </select>
                </div>
                <div class="mb-3" id="multipleClassesField" style="display: none;">
                    <label class="form-label">Select Classes *</label>
                    <div class="border rounded p-3" style="max-height: 200px; overflow-y: auto;">
                        <div class="form-check mb-2">
                            <input class="form-check-input" type="checkbox" id="selectAllClasses" onchange="toggleAllClasses(this)">
                            <label class="form-check-label fw-bold" for="selectAllClasses">
                                Select All Classes (${classesData.classes.length})
                            </label>
                        </div>
                        <hr class="my-2">
                        ${classesData.classes.map(c => `
                            <div class="form-check mb-2">
                                <input class="form-check-input class-checkbox" type="checkbox" value="${c.id}" id="class_${c.id}">
                                <label class="form-check-label" for="class_${c.id}">
                                    ${c.name}
                                </label>
                            </div>
                        `).join('')}
                    </div>
                    <small class="text-muted">Select one or more classes</small>
                </div>
            `;
        }
        
        const modal = `
            <div class="modal fade" id="createAnnouncementModal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Create Announcement</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <form id="createAnnouncementForm">
                                ${targetOptions}
                                <div class="mb-3">
                                    <label class="form-label">Title *</label>
                                    <input type="text" class="form-control" name="title" placeholder="Announcement title" required>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Content *</label>
                                    <textarea class="form-control" name="content" rows="6" placeholder="Announcement content" required></textarea>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary" onclick="submitCreateAnnouncement()">Post Announcement</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modal);
        const modalEl = new bootstrap.Modal(document.getElementById('createAnnouncementModal'));
        modalEl.show();
        
        // Add event listener for target audience change (admin only)
        if (currentUser.role === 'admin') {
            document.getElementById('targetAudience').addEventListener('change', function() {
                const classField = document.getElementById('classField');
                if (this.value === 'class') {
                    classField.style.display = 'block';
                } else {
                    classField.style.display = 'none';
                }
            });
        }
        
        // Add event listener for announcement target change (teacher only)
        if (currentUser.role === 'teacher') {
            document.getElementById('announcementTarget').addEventListener('change', updateAnnouncementTarget);
        }
        
        document.getElementById('createAnnouncementModal').addEventListener('hidden.bs.modal', function () {
            this.remove();
        });
        
    } catch (error) {
        showAlert('Error loading create announcement: ' + error.message, 'danger');
    }
}

async function submitCreateAnnouncement() {
    const form = document.getElementById('createAnnouncementForm');
    const formData = new FormData(form);
    
    const title = formData.get('title');
    const content = formData.get('content');
    
    if (!title || title.trim() === '') {
        showAlert('Please enter an announcement title', 'warning');
        return;
    }
    
    if (!content || content.trim() === '') {
        showAlert('Please enter announcement content', 'warning');
        return;
    }
    
    try {
        let endpoint = '';
        let data = {
            title: title,
            content: content
        };
        
        if (currentUser.role === 'admin') {
            endpoint = '/admin/announcements';
            const targetAudience = document.getElementById('targetAudience').value;
            data.target_audience = targetAudience;
            
            if (targetAudience === 'class') {
                const classId = formData.get('class_id');
                if (!classId) {
                    showAlert('Please select a class', 'warning');
                    return;
                }
                data.class_id = parseInt(classId);
            }
            
            await apiCall(endpoint, 'POST', data);
            bootstrap.Modal.getInstance(document.getElementById('createAnnouncementModal')).hide();
            showAlert('Announcement posted successfully!', 'success');
            loadAnnouncements();
            
        } else if (currentUser.role === 'teacher') {
            const target = document.getElementById('announcementTarget').value;
            
            if (!target) {
                showAlert('Please select announcement target', 'warning');
                return;
            }
            
            if (target === 'students') {
                // Send announcement to individual students
                const checkedStudents = document.querySelectorAll('.student-announcement-checkbox:checked');
                
                if (checkedStudents.length === 0) {
                    showAlert('Please select at least one student', 'warning');
                    return;
                }
                
                const studentIds = Array.from(checkedStudents).map(cb => parseInt(cb.value));
                
                // Send individual announcement to each student
                let successCount = 0;
                let failCount = 0;
                
                for (const studentId of studentIds) {
                    try {
                        await apiCall('/teacher/announcements/individual', 'POST', {
                            student_id: studentId,
                            title: title,
                            content: content
                        });
                        successCount++;
                    } catch (error) {
                        console.error(`Failed to send announcement to student ${studentId}:`, error);
                        failCount++;
                    }
                }
                
                bootstrap.Modal.getInstance(document.getElementById('createAnnouncementModal')).hide();
                
                if (failCount === 0) {
                    if (successCount === 1) {
                        showAlert('Announcement posted successfully!', 'success');
                    } else {
                        showAlert(`Announcement posted successfully to ${successCount} students!`, 'success');
                    }
                } else {
                    showAlert(`Announcement posted to ${successCount} student(s), but failed for ${failCount} student(s)`, 'warning');
                }
                
                loadAnnouncements();
                return;
                
            } else if (target === 'class') {
                // Send announcement to entire class
                const classId = document.getElementById('classAnnouncementSelect').value;
                
                if (!classId) {
                    showAlert('Please select a class', 'warning');
                    return;
                }
                
                data.class_id = parseInt(classId);
                endpoint = '/teacher/announcements';
                
                await apiCall(endpoint, 'POST', data);
                bootstrap.Modal.getInstance(document.getElementById('createAnnouncementModal')).hide();
                showAlert('Announcement posted successfully!', 'success');
                loadAnnouncements();
                
            } else if (target === 'multiple_classes') {
                // Send announcement to multiple classes
                const checkedClasses = document.querySelectorAll('.class-checkbox:checked');
                
                if (checkedClasses.length === 0) {
                    showAlert('Please select at least one class', 'warning');
                    return;
                }
                
                const classIds = Array.from(checkedClasses).map(cb => parseInt(cb.value));
                
                // Send announcement to each class
                let successCount = 0;
                let failCount = 0;
                
                for (const classId of classIds) {
                    try {
                        await apiCall('/teacher/announcements', 'POST', {
                            class_id: classId,
                            title: title,
                            content: content
                        });
                        successCount++;
                    } catch (error) {
                        console.error(`Failed to post announcement to class ${classId}:`, error);
                        failCount++;
                    }
                }
                
                bootstrap.Modal.getInstance(document.getElementById('createAnnouncementModal')).hide();
                
                if (failCount === 0) {
                    if (successCount === 1) {
                        showAlert('Announcement posted successfully!', 'success');
                    } else {
                        showAlert(`Announcement posted successfully to ${successCount} classes!`, 'success');
                    }
                } else {
                    showAlert(`Announcement posted to ${successCount} class(es), but failed for ${failCount} class(es)`, 'warning');
                }
                
                loadAnnouncements();
                return;
            }
        }
        
    } catch (error) {
        showAlert(error.message || 'Failed to post announcement', 'danger');
    }
}

async function loadTeachers() {
    try {
        const data = await apiCall('/admin/teachers');
        const mainContent = document.getElementById('mainContent');
        
        mainContent.innerHTML = `
            <button class="btn btn-primary mb-3" onclick="showRegisterTeacher()">Register Teacher</button>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Subject(s)</th>
                        <th>Phone</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.teachers.map(teacher => `
                        <tr>
                            <td>${teacher.first_name} ${teacher.last_name}</td>
                            <td>${teacher.email}</td>
                            <td>${teacher.subjects || '<span class="text-muted">Not assigned</span>'}</td>
                            <td>${teacher.phone || 'N/A'}</td>
                            <td><span class="badge bg-${teacher.is_active ? 'success' : 'danger'}">${teacher.is_active ? 'Active' : 'Inactive'}</span></td>
                            <td><button class="btn btn-sm btn-secondary" onclick="toggleUserStatus(${teacher.id})">Toggle Status</button></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    } catch (error) {
        showAlert('Error loading teachers', 'danger');
    }
}

async function loadStudents() {
    try {
        const data = await apiCall('/admin/students');
        const mainContent = document.getElementById('mainContent');
        
        mainContent.innerHTML = `
            <button class="btn btn-primary mb-3" onclick="showRegisterStudent()">Register Student</button>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.students.map(student => `
                        <tr>
                            <td>${student.first_name} ${student.last_name}</td>
                            <td>${student.email}</td>
                            <td>${student.phone || 'N/A'}</td>
                            <td><span class="badge bg-${student.is_active ? 'success' : 'danger'}">${student.is_active ? 'Active' : 'Inactive'}</span></td>
                            <td><button class="btn btn-sm btn-secondary" onclick="toggleUserStatus(${student.id})">Toggle Status</button></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    } catch (error) {
        showAlert('Error loading students', 'danger');
    }
}

async function loadClasses() {
    const endpoint = currentUser.role === 'admin' ? '/admin/classes' : 
                     currentUser.role === 'teacher' ? '/teacher/classes' : '/student/classes';
    try {
        const data = await apiCall(endpoint);
        const mainContent = document.getElementById('mainContent');
        
        mainContent.innerHTML = `
            ${currentUser.role === 'admin' ? `
                <div class="mb-3">
                    <button class="btn btn-primary me-2" onclick="showCreateClass()">Create Class</button>
                    <button class="btn btn-success me-2" onclick="showAssignTeacher()">Assign Teacher</button>
                    <button class="btn btn-info" onclick="showEnrollStudent()">Enroll Student</button>
                </div>
            ` : ''}
            <div class="row g-3">
                ${data.classes.map(cls => `
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${cls.name}</h5>
                                <p class="card-text">
                                    Grade: ${cls.grade_level || 'N/A'}<br>
                                    Section: ${cls.section || 'N/A'}<br>
                                    ${cls.student_count !== undefined ? `Students: ${cls.student_count}` : ''}
                                </p>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    } catch (error) {
        showAlert('Error loading classes', 'danger');
    }
}

function showRegisterTeacher() {
    const modal = `
        <div class="modal fade" id="registerTeacherModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Register Teacher</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="registerTeacherForm">
                            <div class="mb-3">
                                <label class="form-label">Email *</label>
                                <input type="email" class="form-control" name="email" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Password *</label>
                                <input type="password" class="form-control" name="password" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">First Name *</label>
                                <input type="text" class="form-control" name="first_name" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Last Name *</label>
                                <input type="text" class="form-control" name="last_name" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Phone</label>
                                <input type="tel" class="form-control" name="phone">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" onclick="submitRegisterTeacher()">Register</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modal);
    const modalEl = new bootstrap.Modal(document.getElementById('registerTeacherModal'));
    modalEl.show();
    document.getElementById('registerTeacherModal').addEventListener('hidden.bs.modal', function () {
        this.remove();
    });
}

async function submitRegisterTeacher() {
    const form = document.getElementById('registerTeacherForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    try {
        const response = await apiCall('/admin/teachers', 'POST', data);
        bootstrap.Modal.getInstance(document.getElementById('registerTeacherModal')).hide();
        showAlert('Teacher registered successfully!', 'success');
        loadTeachers();
    } catch (error) {
        showAlert(error.message || 'Failed to register teacher', 'danger');
    }
}

function showRegisterStudent() {
    const modal = `
        <div class="modal fade" id="registerStudentModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Register Student</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="registerStudentForm">
                            <div class="mb-3">
                                <label class="form-label">Email *</label>
                                <input type="email" class="form-control" name="email" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Password *</label>
                                <input type="password" class="form-control" name="password" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">First Name *</label>
                                <input type="text" class="form-control" name="first_name" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Last Name *</label>
                                <input type="text" class="form-control" name="last_name" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Phone</label>
                                <input type="tel" class="form-control" name="phone">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" onclick="submitRegisterStudent()">Register</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modal);
    const modalEl = new bootstrap.Modal(document.getElementById('registerStudentModal'));
    modalEl.show();
    document.getElementById('registerStudentModal').addEventListener('hidden.bs.modal', function () {
        this.remove();
    });
}

async function submitRegisterStudent() {
    const form = document.getElementById('registerStudentForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    try {
        const response = await apiCall('/admin/students', 'POST', data);
        bootstrap.Modal.getInstance(document.getElementById('registerStudentModal')).hide();
        showAlert('Student registered successfully!', 'success');
        loadStudents();
    } catch (error) {
        showAlert(error.message || 'Failed to register student', 'danger');
    }
}

function showCreateClass() {
    const modal = `
        <div class="modal fade" id="createClassModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Create Class</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="createClassForm">
                            <div class="mb-3">
                                <label class="form-label">Class Name *</label>
                                <input type="text" class="form-control" name="name" placeholder="e.g., Mathematics 10A" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Grade Level</label>
                                <input type="text" class="form-control" name="grade_level" placeholder="e.g., 10th Grade">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Section</label>
                                <input type="text" class="form-control" name="section" placeholder="e.g., A">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Academic Year</label>
                                <input type="text" class="form-control" name="academic_year" placeholder="e.g., 2024-2025">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" onclick="submitCreateClass()">Create</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modal);
    const modalEl = new bootstrap.Modal(document.getElementById('createClassModal'));
    modalEl.show();
    document.getElementById('createClassModal').addEventListener('hidden.bs.modal', function () {
        this.remove();
    });
}

async function submitCreateClass() {
    const form = document.getElementById('createClassForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    try {
        const response = await apiCall('/admin/classes', 'POST', data);
        bootstrap.Modal.getInstance(document.getElementById('createClassModal')).hide();
        showAlert('Class created successfully!', 'success');
        loadClasses();
    } catch (error) {
        showAlert(error.message || 'Failed to create class', 'danger');
    }
}

async function toggleUserStatus(userId) {
    try {
        await apiCall(`/admin/users/${userId}/toggle-status`, 'PATCH');
        showAlert('User status updated', 'success');
        if (currentUser.role === 'admin') {
            const currentSection = document.querySelector('.sidebar .nav-link.active').dataset.section;
            loadSection(currentSection);
        }
    } catch (error) {
        showAlert('Error updating user status', 'danger');
    }
}


// Assign Teacher to Class
async function showAssignTeacher() {
    try {
        // Load teachers and classes
        const teachersData = await apiCall('/admin/teachers');
        const classesData = await apiCall('/admin/classes');
        
        const modal = `
            <div class="modal fade" id="assignTeacherModal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Assign Teacher to Class</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <form id="assignTeacherForm">
                                <div class="mb-3">
                                    <label class="form-label">Teacher *</label>
                                    <select class="form-select" name="teacher_id" required>
                                        <option value="">Select Teacher</option>
                                        ${teachersData.teachers.map(t => 
                                            `<option value="${t.id}">${t.first_name} ${t.last_name} (${t.email})</option>`
                                        ).join('')}
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Class *</label>
                                    <select class="form-select" name="class_id" required>
                                        <option value="">Select Class</option>
                                        ${classesData.classes.map(c => 
                                            `<option value="${c.id}">${c.name}</option>`
                                        ).join('')}
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Subject</label>
                                    <input type="text" class="form-control" name="subject" placeholder="e.g., Mathematics">
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary" onclick="submitAssignTeacher()">Assign</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modal);
        const modalEl = new bootstrap.Modal(document.getElementById('assignTeacherModal'));
        modalEl.show();
        document.getElementById('assignTeacherModal').addEventListener('hidden.bs.modal', function () {
            this.remove();
        });
    } catch (error) {
        showAlert('Error loading data: ' + error.message, 'danger');
    }
}

async function submitAssignTeacher() {
    const form = document.getElementById('assignTeacherForm');
    const formData = new FormData(form);
    const data = {
        teacher_id: parseInt(formData.get('teacher_id')),
        class_id: parseInt(formData.get('class_id')),
        subject: formData.get('subject')
    };
    
    try {
        await apiCall('/admin/assign-teacher', 'POST', data);
        bootstrap.Modal.getInstance(document.getElementById('assignTeacherModal')).hide();
        showAlert('Teacher assigned to class successfully!', 'success');
        loadClasses();
    } catch (error) {
        showAlert(error.message || 'Failed to assign teacher', 'danger');
    }
}

// Enroll Student in Class
async function showEnrollStudent() {
    try {
        // Load students and classes
        const studentsData = await apiCall('/admin/students');
        const classesData = await apiCall('/admin/classes');
        
        const modal = `
            <div class="modal fade" id="enrollStudentModal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Enroll Student in Class</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <form id="enrollStudentForm">
                                <div class="mb-3">
                                    <label class="form-label">Student *</label>
                                    <select class="form-select" name="student_id" required>
                                        <option value="">Select Student</option>
                                        ${studentsData.students.map(s => 
                                            `<option value="${s.id}">${s.first_name} ${s.last_name} (${s.email})</option>`
                                        ).join('')}
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Class *</label>
                                    <select class="form-select" name="class_id" required>
                                        <option value="">Select Class</option>
                                        ${classesData.classes.map(c => 
                                            `<option value="${c.id}">${c.name}</option>`
                                        ).join('')}
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-info" onclick="submitEnrollStudent()">Enroll</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modal);
        const modalEl = new bootstrap.Modal(document.getElementById('enrollStudentModal'));
        modalEl.show();
        document.getElementById('enrollStudentModal').addEventListener('hidden.bs.modal', function () {
            this.remove();
        });
    } catch (error) {
        showAlert('Error loading data: ' + error.message, 'danger');
    }
}

async function submitEnrollStudent() {
    const form = document.getElementById('enrollStudentForm');
    const formData = new FormData(form);
    const data = {
        student_id: parseInt(formData.get('student_id')),
        class_id: parseInt(formData.get('class_id'))
    };
    
    try {
        await apiCall('/admin/enroll-student', 'POST', data);
        bootstrap.Modal.getInstance(document.getElementById('enrollStudentModal')).hide();
        showAlert('Student enrolled in class successfully!', 'success');
        loadClasses();
    } catch (error) {
        showAlert(error.message || 'Failed to enroll student', 'danger');
    }
}

// View assignment submissions (for teachers)
async function viewAssignmentSubmissions(assignmentId) {
    try {
        const data = await apiCall(`/teacher/assignments/${assignmentId}/submissions`);
        const assignments = await apiCall('/teacher/assignments');
        const assignment = assignments.assignments.find(a => a.id === assignmentId);
        
        if (!assignment) {
            showAlert('Assignment not found', 'danger');
            return;
        }
        
        const modal = `
            <div class="modal fade" id="viewSubmissionsModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Submissions: ${assignment.title}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <p><strong>Class:</strong> ${assignment.class_name}</p>
                                <p><strong>Due Date:</strong> ${assignment.due_date ? new Date(assignment.due_date).toLocaleString() : 'No due date'}</p>
                                <p><strong>Total Submissions:</strong> ${data.submissions.length}</p>
                            </div>
                            <hr>
                            ${data.submissions.length === 0 ? 
                                '<p class="text-muted">No submissions yet</p>' :
                                `<div class="list-group">
                                    ${data.submissions.map(sub => `
                                        <div class="list-group-item">
                                            <div class="d-flex justify-content-between align-items-start">
                                                <div>
                                                    <h6 class="mb-1">${sub.first_name} ${sub.last_name}</h6>
                                                    <small class="text-muted">${sub.email}</small><br>
                                                    <small><strong>Submitted:</strong> ${new Date(sub.submitted_at).toLocaleString()}</small>
                                                </div>
                                                ${sub.attachment_path ? 
                                                    `<a href="/${sub.attachment_path}" target="_blank" class="btn btn-sm btn-outline-primary">View File</a>` : 
                                                    ''
                                                }
                                            </div>
                                            ${sub.content ? 
                                                `<div class="mt-2">
                                                    <strong>Response:</strong>
                                                    <p class="mb-0">${sub.content}</p>
                                                </div>` : 
                                                ''
                                            }
                                        </div>
                                    `).join('')}
                                </div>`
                            }
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modal);
        const modalEl = new bootstrap.Modal(document.getElementById('viewSubmissionsModal'));
        modalEl.show();
        document.getElementById('viewSubmissionsModal').addEventListener('hidden.bs.modal', function () {
            this.remove();
        });
        
    } catch (error) {
        showAlert('Error loading submissions: ' + error.message, 'danger');
    }
}

// Update announcement target fields (for teachers)
async function updateAnnouncementTarget() {
    const target = document.getElementById('announcementTarget').value;
    const studentsField = document.getElementById('studentsAnnouncementField');
    const classField = document.getElementById('classAnnouncementField');
    const multipleClassesField = document.getElementById('multipleClassesField');
    
    // Hide all fields
    if (studentsField) studentsField.style.display = 'none';
    if (classField) classField.style.display = 'none';
    if (multipleClassesField) multipleClassesField.style.display = 'none';
    
    if (target === 'students') {
        studentsField.style.display = 'block';
        const studentCheckboxList = document.getElementById('studentAnnouncementCheckboxList');
        studentCheckboxList.innerHTML = '<p class="text-muted">Loading students...</p>';
        
        // Load students from all teacher's classes
        try {
            const classes = window.teacherClassesForAnnouncement || [];
            const studentIds = new Set();
            const students = [];
            
            for (const cls of classes) {
                try {
                    const studentsData = await apiCall(`/teacher/classes/${cls.id}/students`);
                    studentsData.students.forEach(student => {
                        if (!studentIds.has(student.id)) {
                            studentIds.add(student.id);
                            students.push(student);
                        }
                    });
                } catch (error) {
                    console.error(`Error loading students for class ${cls.id}:`, error);
                }
            }
            
            if (students.length === 0) {
                studentCheckboxList.innerHTML = '<p class="text-muted">No students enrolled in your classes</p>';
                return;
            }
            
            students.sort((a, b) => {
                const nameA = `${a.last_name} ${a.first_name}`.toLowerCase();
                const nameB = `${b.last_name} ${b.first_name}`.toLowerCase();
                return nameA.localeCompare(nameB);
            });
            
            studentCheckboxList.innerHTML = `
                <div class="form-check mb-2">
                    <input class="form-check-input" type="checkbox" id="selectAllAnnouncementStudents" onchange="toggleAllAnnouncementStudents(this)">
                    <label class="form-check-label fw-bold" for="selectAllAnnouncementStudents">
                        Select All (${students.length} students)
                    </label>
                </div>
                <hr class="my-2">
                ${students.map(s => `
                    <div class="form-check mb-2">
                        <input class="form-check-input student-announcement-checkbox" type="checkbox" value="${s.id}" id="announcement_student_${s.id}">
                        <label class="form-check-label" for="announcement_student_${s.id}">
                            ${s.first_name} ${s.last_name} <small class="text-muted">(${s.email})</small>
                        </label>
                    </div>
                `).join('')}
            `;
        } catch (error) {
            studentCheckboxList.innerHTML = '<p class="text-danger">Error loading students</p>';
            showAlert('Error loading students: ' + error.message, 'danger');
        }
        
    } else if (target === 'class') {
        classField.style.display = 'block';
        
    } else if (target === 'multiple_classes') {
        multipleClassesField.style.display = 'block';
    }
}

function toggleAllAnnouncementStudents(checkbox) {
    const studentCheckboxes = document.querySelectorAll('.student-announcement-checkbox');
    studentCheckboxes.forEach(cb => {
        cb.checked = checkbox.checked;
    });
}

function toggleAllClasses(checkbox) {
    const classCheckboxes = document.querySelectorAll('.class-checkbox');
    classCheckboxes.forEach(cb => {
        cb.checked = checkbox.checked;
    });
}
