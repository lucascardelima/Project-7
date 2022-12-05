SET QUOTED_IDENTIFIER, ANSI_NULLS ON
GO
-- =============================================
-- Author:		Lucas
-- Create date: 04/10/2022
-- Description:	Update the selected post
-- =============================================
CREATE PROCEDURE [dbo].[updatePost] 
	-- Add the parameters for the stored procedure here
	@postTitle varchar(37) = null,
	@postID varchar(37) = null,
	@postCategory varchar(37) = null,
	@userID varchar(37) = null,
	@postText varchar(MAX) = null, 
	@postEditDate datetime = null
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT	postID

	FROM	Posts
	
	WHERE   postID = @postID

	UPDATE	Posts 
	SET		postText = @postText, 
			postEditDate = @postEditDate, 
			postCategory = @postCategory, 
			postTitle = @postTitle

	WHERE	postID = @postID
	AND		userID = @userID
END
GO