// src/repositories/userRepository.ts

import { Model } from 'mongoose';
import { IUser, IUserDocument } from '@ce-lab-mgmt/api-interfaces';

export class UserRepository {
  private userModel: Model<IUser>;

  constructor(userModel: Model<IUser>) {
    this.userModel = userModel;
  }

  async findOrCreateUser(userData: IUser): Promise<IUserDocument> {
    let user = await this.userModel.findOne({ uid: userData.uid });

    if (!user) {
      user = new this.userModel(userData);
      await user.save();
    }

    return user;
  }

  async updateFirebaseUserId(uid: string, firebaseUserId: string): Promise<IUserDocument | null> {
    return this.userModel.findOneAndUpdate(
      { uid },
      { firebaseUserId },
      { new: true }
    );
  }
}