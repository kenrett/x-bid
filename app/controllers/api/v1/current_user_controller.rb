class Api::V1::CurrentUserController < ApplicationController
  allow_unauthenticated_access

  def show
    render json: {
      user: Current.user ? { email_address: Current.user.email_address, role: Current.user.role } : nil
    }
  end
end