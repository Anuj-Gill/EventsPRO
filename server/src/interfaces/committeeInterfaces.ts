export interface addPubsRequest {
  details: {
    name: string;
    contact: string;
  };
  jwtPayload: any;
  role: string;
}

export interface addSocialHandle {
  details: {
    platform: string;
    handle: string;
  };
  jwtPayload: any;
  role: string;
}

export interface committeeInfoInterface {
  committeeName: string;
  description: string;
  committeeLogo: string;
}
