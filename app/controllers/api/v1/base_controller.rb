class Api::V1::BaseController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :not_found
  rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity

  def show
  end

  private

  def not_found
    render json: { error: "Not Found" }, status: :not_found
  end

  def unprocessable_entity(exception)
    render json: { error: exception.message }, status: :unprocessable_entity
  end
end
