import { Component, OnInit } from '@angular/core';
import { Profile } from '../profile.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AzureDemoService } from '../azure-demo.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profile?: Profile;
  profilePic?: SafeResourceUrl;

  constructor(
    private azureAdDemoService: AzureDemoService,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getProfile();
    this.getProfilePic();
  }

  getProfile() {
    this.azureAdDemoService.getUserProfile().subscribe(profile => {
      this.profile = profile;
    });
  }

  getProfilePic() {
    this.azureAdDemoService.getProfilePic().subscribe(profilePic => {
      const urlCreator = window.URL || window.webkitURL;
      this.profilePic = this.domSanitizer.bypassSecurityTrustResourceUrl(
        urlCreator.createObjectURL(profilePic)
      );
    });
  }
}
