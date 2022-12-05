SET QUOTED_IDENTIFIER, ANSI_NULLS ON
GO
-- =============================================
-- Author:		Lucas
-- Create date: 14/11/2022
-- Description:	
-- =============================================
CREATE PROCEDURE [dbo].[getPost] 
	-- Add the parameters for the stored procedure here
	@postID varchar(37) = null

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT		a.userID,
				a.postTitle,
				a.postCreationDate,
				a.postText,
				a.postCategory,
				a.imageUrl,
				a.postID,
				b.firstName,
				b.lastName,
				b.profileImage

	FROM		Posts a

	LEFT JOIN	Users b

	ON			a.userID = b.userID

	WHERE		a.postID = @postID
END
GO