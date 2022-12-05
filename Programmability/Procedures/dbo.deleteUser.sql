SET QUOTED_IDENTIFIER, ANSI_NULLS ON
GO
-- =============================================
-- Author:		Lucas
-- Create date: 27/11/2022
-- Description:	Delete the User account and also all the content related to that user
-- =============================================
CREATE PROCEDURE [dbo].[deleteUser] 
	-- Add the parameters for the stored procedure here
	@userID varchar(37) = null
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SELECT		profileImage

	FROM		Users

	WHERE		userID = @userID

	DELETE FROM PostLikes
	WHERE	(postID IN ( SELECT	postID
						FROM	Posts
						WHERE	userID = @userID)) OR userID = @userID

	DELETE FROM Comments
	WHERE	(postID IN ( SELECT	postID
						FROM	Posts
						WHERE	userID = @userID)) OR userID = @userID

	DELETE FROM PostViews
	WHERE	(postID IN ( SELECT	postID
						FROM	Posts
						WHERE	userID = @userID)) OR userID = @userID

	DELETE FROM Posts
	WHERE	userID = @userID

	DELETE FROM	UserCredentials
	WHERE	userID = @userID

	DELETE FROM	Users
	WHERE	userID = @userID

END
GO