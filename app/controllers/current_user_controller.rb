class CurrentUserController < ApplicationController
  allow_unauthenticated_access

  def show
    p Current.user
    render json: {
      user: Current.user ? { email_address: Current.user.email_address, role: Current.user.role } : nil
    }
  end
end