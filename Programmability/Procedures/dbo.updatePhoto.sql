SET QUOTED_IDENTIFIER, ANSI_NULLS ON
GO
-- =============================================
-- Author:		Lucas
-- Create date: 27/11/2022
-- Description:	Update the post with the Url from the photo uploaded
-- =============================================
CREATE PROCEDURE [dbo].[updatePhoto] 
	-- Add the parameters for the stored procedure here
	@postID varchar(37) = null,
	@imageUrl varchar(MAX) = null

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	UPDATE	Posts
		
	SET		imageUrl = @imageUrl

	WHERE	postID = @postID
END
GO