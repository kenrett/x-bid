class Api::V1::SessionsController < Api::V1::BaseController
  allow_unauthenticated_access

  def create
    @user = User.find_by(email_address: params[:email_address])

    if @user&.authenticate(params[:password])
      start_new_session_for(@user)
      respond_to do |format|
        format.html { redirect_to after_authentication_url }
        format.json { render json: { user: { email_address: @user.email_address, role: @user.role } }, status: :created }
      end
    else
      respond_to do |format|
        format.html { redirect_to new_session_path, alert: "Invalid email or password" }
        format.json { render json: { error: "Invalid email or password" }, status: :unauthorized }
      end
    end
  end

  def destroy
    terminate_session
    respond_to do |format|
      format.html { redirect_to root_path, notice: "You have been signed out." }
      format.json { head :no_content }
    end
  end
end
