import { Component, ChangeDetectionStrategy, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class DashboardComponent implements OnInit {
  currentMonth = signal('June 2025');
  calendarDays = signal<number[]>([]);
  
  employeeTypes = [
    { name: 'Full-Time', value: 70, count: 76, color: 'bg-teal-500' },
    { name: 'Freelance', value: 15, count: 10, color: 'bg-blue-500' },
    { name: 'Part-Time', value: 10, count: 8, color: 'bg-yellow-500' },
    { name: 'Internship', value: 5, count: 3, color: 'bg-purple-500' },
  ];

  recentActivities = [
    { user: 'XXX', action: 'đã đăng ý 2 yêu cầu nghỉ phép', time: '19 June 2025 - 10:32 AM', avatar: 'https://i.pravatar.cc/150?u=10' },
    { user: 'XXX', action: 'tự động đánh dấu vắng mặt', time: '19 June 2025 - 9:30 AM', avatar: 'https://i.pravatar.cc/150?u=11' },
    { user: 'XXX', action: 'tự động đánh dấu vắng mặt', time: '19 June 2025 - 9:30 AM', avatar: 'https://i.pravatar.cc/150?u=12' },
  ];

  ngOnInit() {
    this.generateCalendar();
  }

  generateCalendar() {
    // Static calendar for June 2025, which starts on a Sunday (index 0)
    // May has 31 days. So last day of May is a Saturday. June 1st is Sunday.
    const days = Array.from({ length: 30 }, (_, i) => i + 1);
    this.calendarDays.set(days);
  }
}
