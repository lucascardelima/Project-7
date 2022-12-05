SET QUOTED_IDENTIFIER, ANSI_NULLS ON
GO
-- =============================================
-- Author:		Lucas
-- Create date: 04/10/2022
-- Description:	Delete the selected post
-- =============================================
CREATE PROCEDURE [dbo].[deletePost] 
	-- Add the parameters for the stored procedure here
	@postID varchar(37) = null,
	@userID varchar(37) = null

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT		imageUrl

	FROM		Posts
	
	WHERE		postID = @postID

	DELETE FROM	PostViews

	WHERE		postID = @postID

	DELETE FROM PostLikes

	WHERE		postID = @postID

	DELETE FROM Comments

	WHERE		postID = @postID
	
	DELETE FROM Posts
	WHERE		postID = @postID
	AND			userID = @userID

	
END
GO